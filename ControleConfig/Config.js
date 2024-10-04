const Sequelize = require("sequelize");
const Conexao = require("../BancoDados/baseDados")

const Config = Conexao.define("Config",{
    id_Config:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    notificacao:{
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    id_info:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

Config.sync();
module.exports = Config;