const express = require('express');
const clientesController = require('../controller/clientesController');
const router = express.Router();
const HomeController = require('../controller/homeController');
const pedidosController = require('../controller/pedidosController');
const produtosController = require('../controller/produtosController');

/* GET home page. */
router.get('/', HomeController.index);

//clientes
router.get('/clientes', clientesController.index); //get todos clientes
router.post('/clientes', clientesController.criarCliente); //post cliente (cria cliente)
router.get('/clientes/:id', clientesController.mostraClientePorID); //get cliente por id
router.put('/clientes/:id', clientesController.editarCliente); //put para editar o cliente pelo id


//produtos
router.get('/produtos', produtosController.index);
router.post('/produtos', produtosController.criarProduto);
router.get('/produtos/:id', produtosController.mostraProdutoPorID);
router.put('/produtos/:id', produtosController.editarProduto);


//pedidos
router.get('/pedidos', pedidosController.index);
router.post('/pedidos', pedidosController.criarPedido);
router.get('/pedidos/:id', pedidosController.mostraPedidoPorID);
router.put('/pedidos/:id', pedidosController.editarPedido);

module.exports = router;
