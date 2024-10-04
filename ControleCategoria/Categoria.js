const Sequelize = require("sequelize");
const Conexao = require("../BancoDados/baseDados");
const Categoria = Conexao.define("categoriaProd", {
    id_categProd:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nome_categ:{
        type: Sequelize.STRING,
        allowNull:false
    }
}) 

Categoria.sync();
module.exports = Categoria;