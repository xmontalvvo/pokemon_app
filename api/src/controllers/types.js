const axios = require('axios');
const { Type } = require('../db.js')

const URL = "https://pokeapi.co/api/v2/type"
const STATUS_OK = 200;
const STATUS_ERROR = 500;

const getAllTypes = async function (req, res) {
    try {
        const types = await axios.get(`${URL}`)
        const typesAll = types.data.results

        const typeName = []

        for (const type of typesAll) {
            let typeExist = await Type.findOne({ where: { name: type.name } })

            if (typeExist) {
                typeName.push(typeExist)
            } else {
                const typeNew = await Type.create({ name: type.name })
                typeName.push(typeNew)
            }
        }

        res.status(STATUS_OK).json(typeName)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    getAllTypes
}