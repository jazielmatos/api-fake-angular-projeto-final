module.exports = class Cliente{
    constructor(cliente){
        this.id = cliente?.id,
        this.nome = cliente?.nome,
        this.telefone = cliente?.telefone,
        this.email = cliente?.email,
        this.cpf = cliente?.cpf,
        this.cep = cliente?.cep,
        this.logradouro = cliente?.logradouro,
        this.numero = cliente?.numero,
        this.bairro = cliente?.bairro,
        this.cidade = cliente?.cidade,
        this.estado = cliente?.estado,
        this.complemento = cliente?.complemento
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

    static async retonarIdNovo(){
        let tamanhoArray = await this.lista();
        let idNovo = 1 + tamanhoArray.length;
        return idNovo;
    }

    static async buscaPorId(id){
        const listaClientes = await this.lista()
        for(let i=0; i<listaClientes.length; i++){
            const clienteDb = listaClientes[i]
            if(clienteDb.id.toString() === id.toString()){
                return clienteDb
            }
        }

        return null
    }

    static async salvar(cliente){
        const listaClientes = await this.lista()
        let exist = false
        for(let i=0; i<listaClientes.length; i++){
            const clienteDb = listaClientes[i]
            if(clienteDb.id.toString() === cliente.id.toString()){
                clienteDb.nome = cliente.nome
                clienteDb.telefone = cliente.telefone
                clienteDb.email = cliente.email
                clienteDb.cpf = cliente.cpf
                clienteDb.cep = cliente.cep
                clienteDb.logradouro = cliente.logradouro
                clienteDb.numero = cliente.numero
                clienteDb.bairro = cliente.bairro
                clienteDb.cidade = cliente.cidade
                clienteDb.estado = cliente.estado
                clienteDb.complemento = cliente.complemento
                exist = true
                break
            }
        }

        if(!exist){
            const objectLiteral = {...cliente}
            listaClientes.push(objectLiteral)
        }

        Cliente.salvarJsonDisco(listaClientes)
    }

    static async salvarJsonDisco(clientes){
        const fs = require('fs');

        try {
            fs.writeFileSync('db/clientesDB.json', JSON.stringify(clientes), {encoding: "utf8"});
        } catch (err) {
            console.error(err);
        }
    }
    
    static async apagarPorId(id){
        const listaClientes = await this.lista()
        const listaNova = []
        for(let i=0; i<listaClientes.length; i++){
            const clienteDb = listaClientes[i]
            if(clienteDb.id.toString() !== id.toString()){
                listaNova.push(clienteDb)
            }
        }
        Cliente.salvarJsonDisco(listaNova)
    }

}