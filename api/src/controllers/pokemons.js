const axios = require('axios');

const URL = "https://pokeapi.co/api/v2/pokemon"
const STATUS_OK = 200;
const STATUS_ERROR = 500;

const getAllPokemons = async function (req, res) {
    try {
        const pokemons = await axios.get(`${URL}`);
        //console.log(pokemons.data.results);
        res.status(STATUS_OK).json(pokemons.data.results)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    getAllPokemons
}