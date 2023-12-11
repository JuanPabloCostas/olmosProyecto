
const { Router } = require('express');
const router = Router();

const controller = require('../controllers/universidades.controllers');

router.get('/', controller.getUniversidades);
router.get('/:id', controller.getUniversidad);

module.exports = router;