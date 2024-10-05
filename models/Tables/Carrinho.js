const Sequelize = require("sequelize");
const Conexao = require("../../BancoDados/baseDados");
const Carrinho = Conexao.define("carrinho",{

    id_carrinho:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    id_info:{
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = Carrinho;