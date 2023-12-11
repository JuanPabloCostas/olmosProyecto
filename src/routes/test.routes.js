// test.routes.js

const {Router} = require('express');
const router = Router();

const controller = require('../controllers/test.controllers');

router.get('/', controller.getTest);

module.exports = router;