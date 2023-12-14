const controller = require("../controllers/auth.controllers");

const {Router} = require('express');

const router = Router();

router.post('/', controller.login);
router.post('/registerAlumno', controller.registerAlumno);
router.post('/registerAdmin', controller.registerAdmin);

module.exports = router;