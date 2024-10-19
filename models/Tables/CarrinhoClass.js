const Sequelize = require("sequelize");
const Conexao = require("../../BancoDados/baseDados");
const Classificado = require("./Classificado");
const Carrinho = require("./Carrinho");

const CarrinhoClassificado = Conexao.define("CarrinhoClassificado", {
    id_carrinhoClass: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_carrinho: {
        type: Sequelize.INTEGER,
        references: {
            model: Carrinho,
            key: 'id_carrinho'
        }
    },
    id_classificado: {
        type: Sequelize.INTEGER,
        references: {
            model: Classificado,
            key: 'id_classificado'
        }
    },
    
});


Carrinho.belongsToMany(Classificado, {
    through: CarrinhoClassificado,
    foreignKey: "id_carrinho",
    otherKey: "id_classificado"
});
Classificado.belongsToMany(Carrinho, {
    through: CarrinhoClassificado,
    foreignKey: "id_classificado",
    otherKey: "id_carrinho"
});

module.exports = CarrinhoClassificado;