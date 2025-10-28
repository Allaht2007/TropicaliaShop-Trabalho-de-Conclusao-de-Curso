// INÍCIO DO ARQUIVO DE TESTE 3 (com Conexão DB)

require('dotenv').config();
const express = require("express");
const app = express();
const session = require("express-session");

// ----------------------------------------------------
// ADICIONANDO O BANCO DE DADOS DE VOLTA
// ----------------------------------------------------
const Conexao = require("./BancoDados/baseDados"); // <-- LINHA DE VOLTA
const {Op} = require("sequelize"); // <-- LINHA DE VOLTA
// ----------------------------------------------------

// MODELOS AINDA COMENTADOS
// const Classificado = require("./models/Tables/Classificado");
// ... etc ...

// SESSÃO
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
}))

app.set("view engine","ejs");
app.use(express.static("public"));

// ROTAS DE CONTROLLERS AINDA COMENTADAS
// app.use("/", controleCarrinho);
// ... etc ...

// TESTE DE AUTENTICAÇÃO DO BANCO DE VOLTA
// (Mudei seu log de erro para console.error para ficar mais fácil de ver)
Conexao.authenticate().then(()=>{  
    console.log("LOG: Conexão com DB (authenticate) OK!");
}).catch((erro)=>{
    console.error("ERRO CRÍTICO NO AUTHENTICATE:", erro); // <-- Mudei para console.error
})

// ROTA DE TESTE
app.get("/", (req, res) => {
  console.log("LOG: Rota / foi acessada!");
  res.status(200).send("Servidor Vercel com SESSÃO e DB está funcionando!");
});


// ROTA DE TESTE PARA VER AS VARIÁVEIS
app.get("/test-env", (req, res) => {
  console.log("LOG: Testando variáveis de ambiente...");
  res.status(200).json({
    session_secret_existe: !!process.env.SESSION_SECRET,
    database_url_existe: !!process.env.DATABASE_URL
  });
});


module.exports = app;

// FIM DO ARQUIVO DE TESTE 3