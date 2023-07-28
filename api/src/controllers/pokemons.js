const { Pokemon, Type } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize')


const URL = "https://pokeapi.co/api/v2/pokemon/";
//const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";  //Aqui se puede limitar hasta cuantos pokemons me trae por defecto
const STATUS_OK = 200;
const STATUS_ERROR = 500;

// :::::::: OBTENER TODOS LOS POKEMONS DE API ::::::::::::::::::::::
const getPokemonsApi = async function (req, res) {
    try {
        const pokemons = await axios.get(`${URL}`);
        //res.status(STATUS_OK).json(pokemons.data.results)
        //return pokemons.data.results

        const results = pokemons.data.results
        const pokemonsApi = await Promise.all(results.map(async (pokemon) => {
            const pokemonInfo = await axios.get(pokemon.url)
            const pokemonData = pokemonInfo.data

            const pokemonObj = {
                id: pokemonData.id,
                name: pokemonData.name,
                img: pokemonData.sprites.other.home.front_default,
                type: pokemonData.types.map(e => e.type.name),
                hp: pokemonData.stats[0].base_stat,
                attack: pokemonData.stats[1].base_stat,
                defense: pokemonData.stats[2].base_stat,
                speed: pokemonData.stats[5].base_stat,
                height: pokemonData.height,
                weight: pokemonData.weight

            }
            return pokemonObj
        }))

        //res.status(STATUS_OK).json(pokemonsApi)
        return pokemonsApi

    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// :::::::: OBTENER TODOS LOS POKEMONS DE DB ::::::::::::::::::::::

const getPokemosDB = async (req, res) => {
    try {
        const pokemonDb = await Pokemon.findAll({
            include: [{
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }]
        })

        const objPokemon = pokemonDb.map((pokemon) => {
            return {
                id: pokemon.dataValues.id,
                name: pokemon.dataValues.name,
                img: pokemon.dataValues.img,
                types: pokemon.dataValues.types,
                hp: pokemon.dataValues.hp,
                attack: pokemon.dataValues.attack,
                defense: pokemon.dataValues.defense,
                speed: pokemon.dataValues.speed,
                height: pokemon.dataValues.height,
                weight: pokemon.dataValues.weight,
                createInDb: pokemon.dataValues.createInDb
            }
        })

        return objPokemon
        //res.status(STATUS_OK).json(objPokemon)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// ::::::::::: OBTENER UN POKEMON POR ID ::::::::::::::::::::
const getPokemonId = async function (req, res) {
    try {

        const uuidRegex = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
        const { id } = req.params

        if (!uuidRegex.test(id)) {
            const apiData = await axios.get(`${URL}/${id}`)
            const data = await apiData.data

            const pokemonData = {
                id: data.id,
                name: data.name,
                img: data.sprites.other.home.front_default,
                type: data.types.map(e => e.type.name).join(', '),
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight
            }
            return res.status(STATUS_OK).json(pokemonData)
        }else{
            const findDb = await Pokemon.findByPk(id, {
                include: [
                    {
                        model: Type,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            })

            return res.status(STATUS_OK).json(findDb)
        }

    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// ::::::::::::::::: OBTENER POKEMONS POR QUERY :::::::::::

const getPokemonQuery = async (req, res) => {
    try {
        const { name } = req.query
        const toLowerName = name.toLowerCase()

        const searchDbName = await Pokemon.findOne({
            where: {
                name: { [Op.iLike]: `%${toLowerName}%` },
            }
        });

        if (searchDbName !== null) {
            const dbData = searchDbName.dataValues

            res.status(STATUS_OK).json(dbData)
        } else {
            const apiData = await axios.get(`${URL}/${toLowerName}`)
            const data = await apiData.data

            const pokemonDataQuery = {
                id: data.id,
                name: data.name,
                img: data.sprites.other.home.front_default,
                type: data.types.map(e => e.type.name),
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight
            }
            res.status(STATUS_OK).json(pokemonDataQuery)
        }

    } catch (error) {
        res.status(STATUS_ERROR).end(error.message + "\nNo existe la busqueda del Pokemon que acabas de digitar en la API ni en la DB")
    }
}

// :::::::::::::RUTA DE PRUEBA :::::::::::::::::::::::::

// :::::::::::::::::: POST DE POKEMONS :::::::::::::::::::
const postPokemons = async function (req, res) {
    try {
        const { name, img, types, hp, attack, defense, speed, height, weight } = req.body

        const pokemon = { name, img, hp, attack, defense, speed, height, weight }

        if (types.length < 2) {
            return res.status(STATUS_ERROR).json({ message: '¡ERROR! Debe estar relacionado con almenos dos tipos' })
        }

        const newPokemon = await Pokemon.create(pokemon)

        const theTypes = await Type.findAll({ where: { name: types } })
        const thePokemon = await newPokemon.addTypes(theTypes)
        const relationPokemonType = await Pokemon.findOne({
            where: { id: newPokemon.id },
            include: [{ model: Type, attributes: ["name"], through: { attributes: [] } }]
        })

        //typesNames = relationPokemonType.types.map((type) => type.get('name'))
        //console.log(typesNames)

        res.status(STATUS_OK).json(relationPokemonType)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// :::::::::::::: OBTENER POKEMONS DE API Y DB :::::::::::::::

const getAllPokemons = async function (req, res) {
    try {
        const getPokemonsAp = await getPokemonsApi()
        //console.log(getPokemonsApi)
        const getPokemonsDb = await getPokemosDB()
        const allPokemons = [...getPokemonsAp, ...getPokemonsDb]
        res.status(STATUS_OK).json(allPokemons)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    getPokemonId,
    postPokemons,
    getPokemonQuery,
    getAllPokemons,
    getPokemosDB
}