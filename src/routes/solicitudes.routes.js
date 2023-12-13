// Importar el módulo Router de Express
const { Router } = require('express');
// Crear una instancia del enrutador
const router = Router();

// Importar el controlador de solicitudes
const controller = require('../controllers/solicitudes.controllers');

// Definir las rutas y los controladores correspondientes
router.get('/', controller.getSolicitudes);
router.get('/:expediente', controller.getSolicitud);
router.post('/:expediente', controller.createSolicitud);
router.put('/status/:expediente', controller.updateSolicitudStatus);

// Exportar el enrutador para su uso en otros archivos
module.exports = router;