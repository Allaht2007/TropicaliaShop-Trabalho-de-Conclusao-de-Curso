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
<<<<<<< HEAD:ControleUsers/Usuario.js
        allowNull: true
=======
        allowNull: false
>>>>>>> dd2ee02203de2a50f9dd6ba7ddfacc6561ffd336:models/Tables/Usuario.js
    }
});

module.exports = Usuario;