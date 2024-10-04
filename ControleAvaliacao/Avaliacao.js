const Sequelize = require("sequelize");
const Conexao = require("../BancoDados/baseDados");
const Avaliacao = Conexao.define("avaliacao",{
    id_avaliacao:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nota_avaliacao:{
        type: Sequelize.INTEGER(1),
        allowNull: false,
    },
    desc_avaliacao:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    id_prod:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_info:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_compra:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }

})

Avaliacao.sync();
module.exports = Avaliacao;