const { mostraPedidoPorID } = require('../controller/pedidosController');

module.exports = class PedidoProduto{
    constructor(pedidoProduto){
        this.id = pedidoProduto?.id,
        this.idPedido = pedidoProduto?.idPedido,
        this.idProduto  = pedidoProduto?.idProduto,
        this.qtd = pedidoProduto?.qtd,
        this.valorTotal = pedidoProduto?.valorTotal
    }

     static async lista(){
        let pedidosProdutos = []
        const fs = require('fs');
        try{
            const jsonPedidosProdutos = await fs.readFileSync('db/pedidosProdutosDB.json', 'utf-8');
            pedidosProdutos = JSON.parse(jsonPedidosProdutos);
        }catch(err){
            console.error(err);
        }
         return pedidosProdutos
    }

    static async retonarIdNovo(){
        let tamanhoArray = await this.lista();
        let idNovo = 1 + tamanhoArray.length;
        return idNovo;
    }


    static async buscaPorId(id){
        const listaPedidosProdutos = await this.lista()
        for(let i=0; i<listaPedidosProdutos.length; i++){
            const pedidoProdutoDb = listaPedidosProdutos[i]
            if(pedidoProdutoDb.id.toString() === id.toString()){
                return pedidoProdutoDb
            }
        }

            return null
    }

    static async buscaPedidoPorId(idPedido){
        const listaPedidosProdutos = await this.lista()
        var listaPedidosProdutosGeral = []
        for(let i=0; i<listaPedidosProdutos.length; i++){
            const pedidoProdutoDb = listaPedidosProdutos[i]
            if(pedidoProdutoDb.idPedido.toString() === idPedido.toString()){
                listaPedidosProdutosGeral.push(pedidoProdutoDb)
            }
        }
        if(listaPedidosProdutosGeral && listaPedidosProdutosGeral.toString()!=""){
            return listaPedidosProdutosGeral 
        }else{
            return null
        }
    }

    static async salvar(pedidoProduto){
        const listaPedidosProdutos = await this.lista()
        let exist = false
        for(let i=0; i<listaPedidosProdutos.length; i++){
            const pedidoProdutoDb = listaPedidosProdutos[i]
            if(pedidoProdutoDb.id.toString() === pedidoProduto.id.toString()){
                pedidoProdutoDb.idPedido = pedidoProduto.cpfCliente
                pedidoProdutoDb.idProduto = pedidoProduto.idProduto
                pedidoProdutoDb.qtd = pedidoProduto.qtd
                pedidoProdutoDb.valorTotal = pedidoProduto.valorTotal
                exist = true
                break
            }
        }

        if(!exist){
            const objectLiteral = {...pedidoProduto}
            listaPedidosProdutos.push(objectLiteral)
        }

        PedidoProduto.salvarJsonDisco(listaPedidosProdutos)
    }

    static async salvarJsonDisco(pedidosProdutos){
        const fs = require('fs');

        try {
            fs.writeFileSync('db/pedidosProdutosDB.json', JSON.stringify(pedidosProdutos), {encoding: "utf8"});
        } catch (err) {
            console.error(err);
        }
    }
    
    static async apagarPorId(id){
        const listaPedidosProdutos = await this.lista()
        const listaNova = []
        for(let i=0; i<listaPedidosProdutos.length; i++){
            const pedidoProdutoDb = listaPedidosProdutos[i]
            if(pedidoProdutoDb.id.toString() !== id.toString()){
                listaNova.push(pedidoProdutoDb)
            }
        }
        PedidoProduto.salvarJsonDisco(listaNova)
    }

}