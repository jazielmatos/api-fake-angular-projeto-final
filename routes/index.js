const express = require('express');
const clientesController = require('../controller/clientesController');
const router = express.Router();
const HomeController = require('../controller/homeController');

/* GET home page. */
router.get('/', HomeController.index);

router.get('/clientes', clientesController.index);
router.get('/produtos', clientesController.index);
router.get('/pedidos', clientesController.index);



module.exports = router;
