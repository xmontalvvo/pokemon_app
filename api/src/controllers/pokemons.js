const { Pokemon, Type } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize')


const URL = "https://pokeapi.co/api/v2/pokemon/";
//const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";  //Aqui se puede limitar hasta cuantos pokemons me trae por defecto
const STATUS_OK = 200;
const STATUS_ERROR = 500;

// :::::::: OBTENER TODOS LOS POKEMONS DE API ::::::::::::::::::::::
const getPokemons = async function (req, res) {
    try {
        const pokemons = await axios.get(`${URL}`);
        //res.status(STATUS_OK).json(pokemons.data.results)
        return pokemons.data.results
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// :::::::: OBTENER TODOS LOS POKEMONS DE DB ::::::::::::::::::::::

const getPokemosDB = async () => {
    try {
        const pokemonDb = await Pokemon.findAll()

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
                weight: pokemon.dataValues.weight
            }
        })

        return objPokemon
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// ::::::::::: OBTENER UN POKEMON POR ID ::::::::::::::::::::
const getPokemonId = async function (req, res) {
    try {
        const { id } = req.params
        const apiData = await axios.get(`${URL}/${id}`)
        const data = await apiData.data

        const pokemonData = {
            id: data.id,
            name: data.name,
            img: data.sprites.other.home.front_default,
            /*types: data.types.map((e) => {
                return ({
                    name: e.type.name,
                    img: e.type.url
                })
            }),*/
            types: data.types.map(e => e.type.name).join(', '),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight
        }

        const findDb = await Pokemon.findByPk(id)

        if (findDb) {
            return res.status(STATUS_OK).json({ Pokemon: findDb })
        } else {
            return res.status(STATUS_ERROR).json(pokemonData)
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
                types: data.types.map(e => e.type.name).join(', '),
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

// const testRoute = async (req, res) => {

//     const { name } = req.query
//     const toLowerName = name.toLowerCase()
//     const searchDbName = await Pokemon.findOne({
//         where: {
//             name: { [Op.iLike]: `%${toLowerName}%` },
//         }
//     });

//     const dataResultDb = searchDbName.dataValues

//     if (dataResultDb != "") {
//         console.log("Exito! Estos son los datos: ")
//     }

//     res.status(STATUS_OK).json(dataResultDb)

// }

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
            include: [{ model: Type, attributes: ['name'], through: { attributes: [] } }]
        })

        res.status(STATUS_OK).json(relationPokemonType)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// :::::::::::::: OBTENER POKEMONS DE API Y DB :::::::::::::::

const getAllPokemons = async function (req, res) {
    try {
        const getPokemonsApi = await getPokemons()
        const getPokemonsDb = await getPokemosDB()
        const allPokemons = [...getPokemonsApi, ...getPokemonsDb]
        //console.log(allPokemons.length > 0);
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
    getPokemosDB,
    getPokemons
}