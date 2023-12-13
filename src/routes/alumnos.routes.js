// Importamos el controlador de alumnos
const controller = require("../controllers/alumnos.controllers");

// Importamos el enrutador de Express
const {Router} = require('express');
const router = Router();

// Definimos las rutas para obtener todos los alumnos, obtener un alumno por expediente y crear un nuevo alumno
router.get('/', controller.getAlumnos);
router.get('/:expediente', controller.getAlumno);
router.post('/', controller.createAlumno);

// Exportamos el enrutador
module.exports = router;