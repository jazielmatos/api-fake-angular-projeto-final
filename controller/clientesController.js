const Cliente = require("../models/clientesModelo");

module.exports = {
    index: async (req, res, next) => {
        const cliente = await Cliente.lista();
        res.status(200).send(cliente);
      },

    mostraClientePorID: async (req, res, next) => {
        let clienteDb = await Cliente.buscaPorId(req.params.id)
        if(!clienteDb) return res.status(404).send({mensagem: "Cliente não encontrado"})
        res.status(200).send(clienteDb)
    },


    criarCliente: async (req, res, next) => {
      const cliente = new Cliente(req.body)
      cliente.id = await Cliente.retonarIdNovo();
      Cliente.salvar(cliente)
      res.status(201).send(cliente)
    },

    editarCliente: async (req, res, next) => {
      let clienteDb = await Cliente.buscaPorId(req.params.id)
      if(!clienteDb) return res.status(404).send({mensagem: "Cliente não encontrado"})

      const cliente = new Cliente(req.body)
      cliente.id = clienteDb.id
      Cliente.salvar(cliente)
      res.status(200).send(cliente)
  },

  delete: (req, res, next) => {
    Cliente.apagarPorId(req.params.id)
    res.status(204).send("")
  },
  

};
