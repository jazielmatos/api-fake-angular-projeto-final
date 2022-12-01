const express = require('express');
const router = express.Router();
const HomeController = require('../controller/homeController');
const UsuariosController = require('../controller/usuariosController');

/* GET home page. */
router.get('/', HomeController.index);

router.get('/usuarios', UsuariosController.index);


module.exports = router;
