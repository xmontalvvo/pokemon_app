const {Router} = require("express");
const router = Router();

const {getPokemons, getPokemonId, postPokemons} = require('../controllers/pokemons');

router.get('/pokemons', getPokemons); // ruta y (cb) <- con req, res
router.get('/pokemons/:id', getPokemonId);
/*
router.get('/pokemons/?', );  // <- investigar como definir ruta por query
*/
router.post('/pokemons', postPokemons);


module.exports = router;