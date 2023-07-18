const axios = require('axios');

const URL = "https://pokeapi.co/api/v2/type"
const STATUS_OK = 200;
const STATUS_ERROR = 500;

const getAllTypes = async function (req, res){
    try {
        const types = await axios.get(`${URL}`)
        res.status(STATUS_OK).json(types.data.results)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    getAllTypes
}