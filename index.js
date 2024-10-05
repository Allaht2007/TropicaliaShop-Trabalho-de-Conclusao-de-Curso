const express = require("express");
const Conexao = require("./BancoDados/baseDados");
const app = express();


const controleusers = require("./models/Control/controleUsers");
const controleInfo = require("./models/Control/ControleInfo");
const controleFav = require("./models/Control/ControleFav");
const controleConfig = require("./models/Control/ControleConfig");
const controleClassificado = require("./models/Control/ControleClassificado")

const controleCompras = require("./models/Control/ControleCompras");
const controleAvaliacao = require("./models/Control/ControleAvaliacao");
const controleCarrinho = require("./models/Control/ControleCarrinho");

const controleCategoria = require("./models/Control/ControleCategoria");
const controleClassCateg = require("./models/Control/ControleClassCateg");
const controleCarrinhoClass = require("./models/Control/ControleCarrinhoClass");
const sync = require("./models/sync");


app.use("/", controleCarrinho);
app.use("/", controleCompras);
app.use("/", controleCategoria);
app.use("/", controleClassificado);
app.use("/", controleConfig);
app.use("/", controleusers);
app.use("/", controleInfo);
app.use("/", controleFav);
app.use("/", controleAvaliacao);
app.use("/", controleClassCateg);
app.use("/", controleCarrinhoClass);





Conexao.authenticate().then(()=>{  
    console.log("Servidor rodando");
}).catch((erro)=>{
    console.log(erro);
})

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("../views/index");
})


app.listen(3000,()=>{
    console.log("Servidor Rodando");
});