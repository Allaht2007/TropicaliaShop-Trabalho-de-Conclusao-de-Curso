const Sequelize = require("sequelize");
const Conexao = require("../../BancoDados/baseDados");
const Compras = require("./Compras");
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
    id_compras:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:Compras,
            key:"id_compras"
        }
    }

})

Compras.hasMany(Avaliacao,{
    foreignKey:"id_compras"
});
Avaliacao.belongsTo(Compras,{
    foreignKey:"id_compras"
});

module.exports = Avaliacao;