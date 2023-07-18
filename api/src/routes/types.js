const {Router} = require('express');
const router = Router();

const {getAllTypes} = require('../controllers/types')

router.get('/types', getAllTypes);

module.exports = router;