require('dotenv').config();

const express = require("express");
const Conexao = require("./BancoDados/baseDados");
const session = require("express-session");
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
const controleCarrinhoClass = require("./models/Control/ControleCarrinhoClass");
const sync = require("./models/sync");

app.use(session({
    secret:"3RMT2AGrVgPs4LGr5OFhN",
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
}))

app.use("/", controleCarrinho);
app.use("/", controleCompras);
app.use("/", controleCategoria);
app.use("/", controleClassificado);
app.use("/", controleConfig);
app.use("/", controleusers);
app.use("/", controleInfo);
app.use("/", controleFav);
app.use("/", controleAvaliacao);
app.use("/", controleCarrinhoClass);





Conexao.authenticate().then(()=>{  
    console.log("Servidor rodando");
}).catch((erro)=>{
    console.log(erro);
})

app.set("view engine","ejs");
app.use(express.static("public"));

//Configurando o Multer







app.get("/",(req,res)=>{
    res.render("../views/index");
})


app.listen(3000,()=>{
    console.log("Servidor Rodando");
});