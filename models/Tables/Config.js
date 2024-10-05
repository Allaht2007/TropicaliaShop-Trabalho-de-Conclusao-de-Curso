const Sequelize = require("sequelize");
const Info = require("./info")
const Conexao = require("../../BancoDados/baseDados")

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
    preferencias: {
        type: Sequelize.JSON,
        allowNull: false,
    },
    id_info:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:Info,
            key: "id_info"
        }
    }
})

Info.hasMany(Config,{
    foreignKey: "id_info",
});
Config.belongsTo(Info,{
    foreignKey:"id_info"
});

module.exports = Config;