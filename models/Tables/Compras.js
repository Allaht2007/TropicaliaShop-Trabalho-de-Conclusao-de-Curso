const Sequelize = require("sequelize");
const Conexao = require("../../BancoDados/baseDados");
const CarrinhoClass = require("../Tables/CarrinhoClass");
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
    id_info:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_CarrinhoClass:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:CarrinhoClass,
            key:"id_carrinhoClass"
        }
    }
})
CarrinhoClass.hasMany(Compras, { 
    foreignKey: 'id_CarrinhoClass' 
});
Compras.belongsTo(CarrinhoClass, {
     foreignKey: 'id_CarrinhoClass' 
});

module.exports = Compras;