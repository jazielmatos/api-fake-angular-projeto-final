const Pedido = require("../models/pedidosModelo");

module.exports = {
  index: async (req, res, next) => {
    const pedido = await Pedido.lista();
    res.status(200).send(pedido);
  },

  mostraPedidoPorID: async (req, res, next) => {
    let pedidoDb = await Pedido.buscaPorId(req.params.id)
    if(!pedidoDb) return res.status(404).send({mensagem: "Produto não encontrado"})
    res.status(200).send(pedidoDb)
  },

  criarPedido: async (req, res, next) => {
    const pedido = new Pedido(req.body)
    pedido.id = await Pedido.retonarIdNovo();
    Pedido.salvar(pedido)
    res.status(201).send(pedido)
  },

  editarPedido: async (req, res, next) => {
    let pedidoDb = await Pedido.buscaPorId(req.params.id)
    if(!pedidoDb) return res.status(404).send({mensagem: "Pedido não encontrado"})

    const pedido = new Pedido(req.body)
    pedido.id = pedidoDb.id
    Pedido.salvar(pedido)
    res.status(200).send(pedido)
  },

  delete: (req, res, next) => {
    Pedido.apagarPorId(req.params.id)
    res.status(204).send("")
  },
  

};
