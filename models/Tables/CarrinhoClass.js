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
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },   
    status:{
        type: Sequelize.ENUM("nulo","pendente","Concluido")
    }, 
    data_adicionado:{
        type: Sequelize.DATE,
        allowNull:false
    },
    id_classificado: {
        type: Sequelize.INTEGER,
        references: {
            model: Classificado,
            key: 'id_classificado'
        }
    },
    
});


CarrinhoClassificado.belongsTo(Carrinho, {
    
    foreignKey: "id_carrinho",
    
});
Carrinho.hasMany(CarrinhoClassificado,{
    foreignKey:"id_carrinho",
});

CarrinhoClassificado.belongsTo(Classificado, {
  
    foreignKey: "id_classificado",
  
});
Classificado.hasMany(CarrinhoClassificado, {
    foreignKey: "id_classificado"

});



module.exports = CarrinhoClassificado;