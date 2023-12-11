

const {Router} = require('express');
const router = Router();

const controller = require('../controllers/paises.controllers');

router.get('/', controller.getPaises);
router.get('/paisesNombre', controller.getPaisesNombre);

module.exports = router;