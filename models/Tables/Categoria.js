const Sequelize = require("sequelize");
const Conexao = require("../../BancoDados/baseDados");
const Categoria = Conexao.define("categoria", {
    id_categoria:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true    
    },
    nome_categ:{
        type: Sequelize.STRING,
        allowNull:false
    },
    tipo_categ:{
        type: Sequelize.ENUM("bebida","acessorio"),
        allowNull: false,
    }
});

module.exports = Categoria;

