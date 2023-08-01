const {Router} = require("express");
const router = Router();

const { getAllPokemons, getPokemonId, postPokemons, getPokemonQuery} = require('../controllers/pokemons');

router.get('/pokemons', getAllPokemons); // ruta y (cb) <- con req, res
router.get('/pokemons/:id', getPokemonId);
router.get('/pokemon', getPokemonQuery);
router.post('/pokemons', postPokemons);

module.exports = router;