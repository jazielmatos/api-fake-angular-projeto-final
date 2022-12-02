module.exports = class Cliente{
    constructor(){
        this.id = 0,
        this.nome = ""
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