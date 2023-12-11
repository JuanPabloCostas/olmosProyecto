
const { Router } = require('express');
const router = Router();

const controller = require('../controllers/solicitudes.controllers');

router.get('/', controller.getSolicitudes);
router.get('/:expediente', controller.getSolicitud);
router.post('/:expediente', controller.createSolicitud);
router.put('/status/:expediente', controller.updateSolicitudStatus);

module.exports = router;