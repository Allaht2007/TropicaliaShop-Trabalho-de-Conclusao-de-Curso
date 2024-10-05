const Sequelize = require("sequelize");
const Conexao = require("../../BancoDados/baseDados");
const Categoria = require("./Categoria");
const Classificado = require("./Classificado");

const ClassCateg = Conexao.define("classCateg",{
    
    id_ClassCateg:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_class:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: Classificado,
            key: "id_classificado"
        }
    },
    id_categoria:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
        model: Categoria,
        key: "id_categoria"
        }
    }
});

Classificado.belongsToMany(Categoria,{
    through:ClassCateg,
    foreignKey:"id_class",
    otherKey: "id_categoria"
});

Categoria.belongsToMany(Classificado,{
    through: ClassCateg,
    foreignKey: "id_categoria",
    otherKey: "id_class"
});

module.exports = ClassCateg;