const PedidoProduto = require("../models/pedidosProdutosModelo");

module.exports = {
  index: async (req, res, next) => {
    const pedidoProduto = await PedidoProduto.lista();
    res.status(200).send(pedidoProduto);
  },

  mostraPedidoProdutoPorID: async (req, res, next) => {
    let pedidoProdutoDb = await PedidoProduto.buscaPedidoPorId(req.params.id)
    if(!pedidoProdutoDb) return res.status(404).send({mensagem: "Pedido não encontrado"})
    res.status(200).send(pedidoProdutoDb)
  },

  criarPedidoProduto: async (req, res, next) => {
    const pedidoProduto = new PedidoProduto(req.body)
    pedidoProduto.id = await PedidoProduto.retonarIdNovo();
    PedidoProduto.salvar(pedidoProduto)
    res.status(201).send(pedidoProduto)
  },

  editarPedidoProduto: async (req, res, next) => {
    let pedidoProdutoDb = await PedidoProduto.buscaPorId(req.params.id)
    if(!pedidoProdutoDb) return res.status(404).send({mensagem: "Pedido não encontrado"})

    const pedidoProduto = new PedidoProduto(req.body)
    pedidoProduto.id = pedidoProdutoDb.id
    PedidoProduto.salvar(pedidoProduto)
    res.status(200).send(pedidoProduto)
  },

  delete: (req, res, next) => {
    PedidoProduto.apagarPorId(req.params.id)
    res.status(204).send("")
  },
  

};
