const controller = require("../controllers/alumnos.controllers");

const {Router} = require('express');
const router = Router();

router.get('/', controller.getAlumnos);
router.get('/:expediente', controller.getAlumno);
router.post('/', controller.createAlumno);

module.exports = router;