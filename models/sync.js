require('dotenv').config();

const Avaliacao = require("./Tables/Avaliacao");
const Carrinho = require("./Tables/Carrinho");
const CarrinhoClass = require("./Tables/CarrinhoClass");
const Categoria = require("./Tables/Categoria");
const Classificado = require("./Tables/Classificado");
const Compras = require("./Tables/Compras");
const Fav = require("./Tables/Fav");
const Usuario = require("./Tables/Usuario");
const Info = require("./Tables/info");


Usuario.sync();

Info.sync().then(()=>{
 
        Categoria.sync().then(()=>{
            Classificado.sync().then(()=>{
                Fav.sync();
                Carrinho.sync().then(()=>{
                    CarrinhoClass.sync().then(()=>{
                        Compras.sync().then(()=>{
                            Avaliacao.sync();
                    });   
                    })
            
                })
                
            })
           
        })



})