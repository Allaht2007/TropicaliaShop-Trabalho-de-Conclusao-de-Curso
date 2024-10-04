const express = require("express");
const Conexao = require("./BancoDados/baseDados");
const app = express();


const controleusers = require("./ControleUsers/controleUsers");
const controleInfo = require("./ControleInfo/ControleInfo");
const controleFav = require("./ControleFav/ControleFav");
const controleConfig = require("./ControleConfig/ControleConfig");
const controleClassificado = require("./ControleClassificado/ControleClassificado")
const controleCategoria = require("./ControleCategoria/ControleCategoria");
const controleCompras = require("./ControleCompras/ControleCompras");
const controleAvaliacao = require("./ControleAvaliacao/ControleAvaliacao")

app.use("/", controleCompras)
app.use("/", controleCategoria);
app.use("/", controleClassificado);
app.use("/", controleConfig);
app.use("/", controleusers);
app.use("/", controleInfo);
app.use("/", controleFav);
app.use("/", controleAvaliacao);



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