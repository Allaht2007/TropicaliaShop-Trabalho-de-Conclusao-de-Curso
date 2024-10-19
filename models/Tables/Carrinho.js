const Sequelize = require("sequelize");
const Conexao = require("../../BancoDados/baseDados");
const Carrinho = Conexao.define("carrinho",{

    id_carrinho:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },   
    status:{
        type: Sequelize.ENUM("nulo","pendente","Concluido")
    },
    total_preco:{
        type: Sequelize.DOUBLE,
        allowNull:false,
    },
    id_info:{
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = Carrinho;