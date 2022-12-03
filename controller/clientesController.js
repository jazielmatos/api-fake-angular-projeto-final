const Cliente = require("../models/clientesModelo");

module.exports = {
    index: async (req, res, next) => {
        const cliente = await Cliente.lista();
        res.status(200).send(cliente);
      },
      create: (req, res, next) =>{
        const cliente = new Cliente( req.body)
        Cliente.salvar(cliente)
        res.status(201)
      }
};
