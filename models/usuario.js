module.exports = class Usuario{
    constructor(){
        this.id = 0,
        this.nome = ""
    }

    static lista(){
        let usuario
        return Usuario.usuarios
    }


}