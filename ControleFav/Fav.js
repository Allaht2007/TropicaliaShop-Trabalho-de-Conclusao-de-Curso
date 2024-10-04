const Sequelize = require("sequelize");
const Conexao = require("../BancoDados/baseDados")

const Fav = Conexao.define("Favoritos",{
    id_Fav:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_prod:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    id_info:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

Fav.sync();
module.exports = Fav;