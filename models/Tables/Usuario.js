const Sequelize = require('sequelize');
const Conexao = require ('../../BancoDados/baseDados');
const Usuario =  Conexao.define("Usuario",{
    id_user:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_user:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email_user:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha_user:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf_cnpj:{
        type: Sequelize.STRING(18),
        allowNull: false
    },
    tipo_user:{
        type: Sequelize.ENUM('admin','PF','PJ'),
        allowNull: true
    }
});

module.exports = Usuario;