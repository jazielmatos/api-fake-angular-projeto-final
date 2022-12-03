module.exports = class Pedido{
    constructor(pedido){
        this.id = pedido?.id,
        this.cpfCliente = pedido?.cpfCliente,
        this.valorTotal = pedido?.valorTotal,
        this.data = pedido?.data
    }

    static async lista(){
        let pedidos = []
        const fs = require('fs');
        try{
            const jsonPedidos = await fs.readFileSync('db/pedidosDB.json', 'utf-8');
            pedidos = JSON.parse(jsonPedidos);
        }catch(err){
            console.error(err);
        }
         return pedidos
    }

    static async retonarIdNovo(){
        let tamanhoArray = await this.lista();
        let idNovo = 1 + tamanhoArray.length;
        return idNovo;
    }

    static async buscaPorId(id){
        const listaPedidos = await this.lista()
        for(let i=0; i<listaPedidos.length; i++){
            const pedidoDb = listaPedidos[i]
            if(pedidoDb.id.toString() === id.toString()){
                return pedidoDb
            }
        }

        return null
    }

    static async salvar(pedido){
        const listaPedidos = await this.lista()
        let exist = false
        for(let i=0; i<listaPedidos.length; i++){
            const pedidoDb = listaPedidos[i]
            if(pedidoDb.id.toString() === pedido.id.toString()){
                pedidoDb.cpfCliente = pedido.cpfCliente
                pedidoDb.valorTotal = pedido.valorTotal
                pedidoDb.data = pedido.data
                exist = true
                break
            }
        }

        if(!exist){
            const objectLiteral = {...pedido}
            listaPedidos.push(objectLiteral)
        }

        Pedido.salvarJsonDisco(listaPedidos)
    }

    static async salvarJsonDisco(pedidos){
        const fs = require('fs');

        try {
            fs.writeFileSync('db/pedidosDB.json', JSON.stringify(pedidos), {encoding: "utf8"});
        } catch (err) {
            console.error(err);
        }
    }
    
    static async apagarPorId(id){
        const listaPedidos = await this.lista()
        const listaNova = []
        for(let i=0; i<listaPedidos.length; i++){
            const pedidoDb = listaPedidos[i]
            if(pedidoDb.id.toString() !== id.toString()){
                listaNova.push(pedidoDb)
            }
        }
        Pedido.salvarJsonDisco(listaNova)
    }

}