const Sequelize = require('sequelize');
const Conexao = require ('../../BancoDados/baseDados');
const Info =  Conexao.define("informacao",{
    id_info:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cep:{
        type: Sequelize.STRING,
        allowNull:false
    },
    uf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro:{
        type: Sequelize.STRING,
        allowNull: false
    },
    rua:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numero_casa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento:{
        type: Sequelize.STRING,
   
    },
    cpf_cnpj:{
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nasc:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    afiliado:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
    },
    id_fav:{
        type:Sequelize.INTEGER,
       
    },

    
});

module.exports = Info;