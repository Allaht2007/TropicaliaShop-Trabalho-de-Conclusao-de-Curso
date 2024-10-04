const Sequelize = require("sequelize");
const Conexao = require("../BancoDados/baseDados");
const Carrinho = Conexao.define("carrinho",{

    id_carrinho:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    qnt_prod:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    total_preco:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    id_info:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_classificado:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Carrinho.sync();

module.exports = Carrinho;