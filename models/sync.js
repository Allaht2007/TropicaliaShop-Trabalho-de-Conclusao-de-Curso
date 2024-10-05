const Avaliacao = require("./Tables/Avaliacao");
const Carrinho = require("./Tables/Carrinho");
const CarrinhoClass = require("./Tables/CarrinhoClass");
const Categoria = require("./Tables/Categoria");
const ClassCateg = require("./Tables/ClassCateg");
const Classificado = require("./Tables/Classificado");
const Compras = require("./Tables/Compras");
const Config = require("./Tables/Config");
const Fav = require("./Tables/Fav");
const Usuario = require("./Tables/Usuario");
const Info = require("./Tables/info");

Usuario.sync();

Info.sync().then(()=>{
 
    Classificado.sync().then(()=>{
        Categoria.sync().then(()=>{
            ClassCateg.sync();
            Fav.sync();
        })
    })

    Carrinho.sync().then(()=>{
        CarrinhoClass.sync();   
        Compras.sync().then(()=>{
            Avaliacao.sync();
        })
        
        
    
    })
    
    Config.sync()


})