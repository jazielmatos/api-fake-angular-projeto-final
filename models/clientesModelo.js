const { encode } = require('punycode')

module.exports = class Cliente{
    constructor(cliente){
        this.id = cliente?.id
        this.nome = cliente?.nome
        this.telefone = cliente?.telefone
        this.email = cliente?.email
        this.cpf = cliente?.cpf
        this.cep = cliente?.cep
        this.logradouro = cliente?.logradouro
        this.numero = cliente?.numero
        this.bairro = cliente?.bairro
        this.cidade = cliente?.cidade
        this.estado = cliente?.estado
        this.complemento = cliente?.complemento
    }

    //metodos staticos
    static async salvar(cliente){
        const objectLiteral = {...cliente}
        const listaClientes = await this.lista()
        let exist = false
        for(let i=0; i< listaClientes; i++){
            const clienteDb = listaClientes[i]
            if(clienteDb.id == cliente.id){
                
                clienteDb.nome == cliente.nome
                clienteDb.telefone == cliente.telefone
                clienteDb.email == cliente.email
                clienteDb.cpf == cliente.cpf
                clienteDb.cep == cliente.cep
                clienteDb.logradouro == cliente.logradouro
                clienteDb.numero == cliente.numero
                clienteDb.bairro == cliente.bairro
                clienteDb.cidade == cliente.cidade
                clienteDb.estado == cliente.estado
                clienteDb.complemento == cliente.complemento
                exist = true
                break
            }
        }
        if(!exist){
            const objectLiteral = {...cliente}
            listaClientes.push(objectLiteral)
        }

        const fs = require('fs');
        try{
             fs.writeFileSync('db/clientesDB.json',JSON.stringify(listaClientes), {encode:'utf-8'});
            clientes = JSON.parse(jsonClientes);
        }catch(err){
            console.error(err);
        }
    }
    static async lista(){
        let clientes = []
        const fs = require('fs');
        try{
            const jsonClientes = await fs.readFileSync('db/clientesDB.json', 'utf-8');
            clientes = JSON.parse(jsonClientes);
        }catch(err){
            console.error(err);
        }
         return clientes
    }


}