const Sequelize = require("sequelize");
const Conexao = require("../../BancoDados/baseDados");
const Info = require("./info");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");
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
    desc_prod:{
        type: Sequelize.TEXT,
        allowNull: false
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
    id_info:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: Info,
            key: "id_info"
        }

    }
});

Info.hasMany(Classificado,{
    foreignKey: "id_info",
});
Classificado.belongsTo(Info,{
    foreignKey: "id_info",
    as: "info"
});

module.exports = Classificado;

