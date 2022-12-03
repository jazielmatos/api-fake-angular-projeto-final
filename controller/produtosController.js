const Produto = require("../models/produtosModelo");

module.exports = {
  index: async (req, res, next) => {
    const produto = await Produto.lista();
    res.status(200).send(produto);
  },

  mostraProdutoPorID: async (req, res, next) => {
    let produtoDb = await Produto.buscaPorId(req.params.id)
    if(!produtoDb) return res.status(404).send({mensagem: "Produto não encontrado"})
    res.status(200).send(produtoDb)
  },

  criarProduto: async (req, res, next) => {
    const produto = new Produto(req.body)
    produto.id = await Produto.retonarIdNovo();
    Produto.salvar(produto)
    res.status(201).send(produto)
  },

  editarProduto: async (req, res, next) => {
    let produtoDb = await Produto.buscaPorId(req.params.id)
    if(!produtoDb) return res.status(404).send({mensagem: "Produto não encontrado"})

    const produto = new Produto(req.body)
    produto.id = produtoDb.id
    Produto.salvar(produto)
    res.status(200).send(produto)
  },

  delete: (req, res, next) => {
    Produto.apagarPorId(req.params.id)
    res.status(204).send("")
  },
  

};
