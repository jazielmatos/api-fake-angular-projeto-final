const Usuario = require("../models/usuario");

module.exports = {
    index: (req, res, next) => {
              res.status(200).send(Usuario.lista());
      }
};
