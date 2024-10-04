const Sequelize = require("sequelize");
const Conexao = require("../BancoDados/baseDados");
const Compras = Conexao.define("Compras",{
    id_compras:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_compra:{
        type: Sequelize.DATE,
        allowNull: false
    },
    total_compra:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    id_prod:{
        type: Sequelize.INTEGER,
        allowNull: false,    
    },
    id_info:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_carrinho:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

Compras.sync();
module.exports = Compras;