const Sequelize = require("sequelize");
const Conexao = require("../BancoDados/baseDados");
const Classificado = Conexao.define("Classificado",{

    id_classificado:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_prod:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    qnt_prod:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco_prod:{
        type: Sequelize.DOUBLE,
        allowNull:false
    },
    data_public:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    qnt_vendas:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    qnt_views:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imagens:{
        type: Sequelize.BLOB,
        allowNull:false
    },
    id_categ:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    id_info:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Classificado.sync();
module.exports = Classificado;