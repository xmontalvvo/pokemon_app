const { Pokemon } = require('../db.js');
const axios = require('axios');

const URL = "https://pokeapi.co/api/v2/pokemon";
const STATUS_OK = 200;
const STATUS_ERROR = 500;

// :::::::: OBTENER TODOS LOS POKEMONS ::::::::::::::::::::::
const getPokemons = async function (req, res) {
    try {
        const pokemons = await axios.get(`${URL}`);
        res.status(STATUS_OK).json(pokemons.data.results)
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
            types: data.types.map((e) => {
                return ({
                    name: e.type.name,
                    img: e.type.url
                })
            }),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight
        }

        res.status(STATUS_OK).json(pokemonData)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// ::::::::::::::::: OBTENER POKEMONS POR QUERY :::::::::::



// :::::::::::::::::: POST DE POKEMONS :::::::::::::::::::
const postPokemons = async function (req, res) {
    try {
        const { name, img, hp, attack, defense, speed, height, weight } = req.body

        const pokemon = { name, img, hp, attack, defense, speed, height, weight }

        const newPokemon = await Pokemon.create(pokemon)
        res.status(STATUS_OK).json(newPokemon)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// :::::::::::::: OBTENER POKEMONS DE API Y DB :::::::::::::::

//! ESTA INCOMPLETA

const getAllPokemons = async function(){
    const getPokemons = await getPokemons()

}

module.exports = {
    getPokemons,
    getPokemonId,
    postPokemons
}