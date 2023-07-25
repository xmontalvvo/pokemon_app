const {Router} = require("express");
const router = Router();

const { getAllPokemons, getPokemonId, postPokemons, getPokemosDB, getPokemonQuery} = require('../controllers/pokemons');

router.get('/pokemons', getAllPokemons); // ruta y (cb) <- con req, res
router.get('/pokemons/:id', getPokemonId); //! Investigar porque al crear la ruta de Query me trae datos por id pero da un error 500 (antes de eso no pasaba)
router.get('/pokemon', getPokemonQuery);
router.post('/pokemons', postPokemons);

module.exports = router;