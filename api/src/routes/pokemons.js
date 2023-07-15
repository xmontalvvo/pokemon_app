const {Router} = require("express");
const router = Router();

const {getAllPokemons} = require('../controllers/pokemons');

router.get('/pokemons', getAllPokemons); // ruta y (cb) <- con req, res
/*
router.get('pokemons/:idPokemon', );
router.get('/pokemons/?', );  // <- investigar como definir ruta por query
router.post('/pokemons', );
*/

module.exports = router;