const Sequelize = require("sequelize");
const Conexao = require("../../BancoDados/baseDados");
const Info = require("./info");

const Fav = Conexao.define("Favoritos",{
    id_Fav:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_class:{
        type: Sequelize.INTEGER,
        allowNull:false,
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

Info.hasMany(Fav,{
    foreignKey: "id_info"
});
Fav.belongsTo(Info,{
    foreignKey:"id_info"
})

module.exports = Fav;