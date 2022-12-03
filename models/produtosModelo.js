module.exports = class Produto{
    constructor(produto){
        this.id = produto?.id,
        this.nome = produto?.nome,
        this.desc = produto?.desc,
        this.valor = produto?.valor,
        this.qtdEstoque = produto?.qtdEstoque
    }

    static async lista(){
        let produtos = []
        const fs = require('fs');
        try{
            const jsonProdutos = await fs.readFileSync('db/produtosDB.json', 'utf-8');
            produtos = JSON.parse(jsonProdutos);
        }catch(err){
            console.error(err);
        }
         return produtos
    }

    static async retonarIdNovo(){
        let tamanhoArray = await this.lista();
        let idNovo = 1 + tamanhoArray.length;
        return idNovo;
    }

    static async buscaPorId(id){
        const listaProdutos = await this.lista()
        for(let i=0; i<listaProdutos.length; i++){
            const produtoDb = listaProdutos[i]
            if(produtoDb.id.toString() === id.toString()){
                return produtoDb
            }
        }

        return null
    }

    static async salvar(produto){
        const listaProdutos = await this.lista()
        let exist = false
        for(let i=0; i<listaProdutos.length; i++){
            const produtoDb = listaProdutos[i]
            if(produtoDb.id.toString() === produto.id.toString()){
                produtoDb.nome = produto.nome
                produtoDb.desc = produto.desc
                produtoDb.valor = produto.valor
                produtoDb.qtdEstoque = produto.qtdEstoque
                exist = true
                break
            }
        }

        if(!exist){
            const objectLiteral = {...produto}
            listaProdutos.push(objectLiteral)
        }

        Produto.salvarJsonDisco(listaProdutos)
    }

    static async salvarJsonDisco(produtos){
        const fs = require('fs');

        try {
            fs.writeFileSync('db/produtosDB.json', JSON.stringify(produtos), {encoding: "utf8"});
        } catch (err) {
            console.error(err);
        }
    }
    
    static async apagarPorId(id){
        const listaProdutos = await this.lista()
        const listaNova = []
        for(let i=0; i<listaProdutos.length; i++){
            const produtoDb = listaProdutos[i]
            if(produtoDb.id.toString() !== id.toString()){
                listaNova.push(produtoDb)
            }
        }
        Produto.salvarJsonDisco(listaNova)
    }

}