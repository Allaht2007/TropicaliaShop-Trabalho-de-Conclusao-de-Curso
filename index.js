// INÍCIO DO ARQUIVO DE TESTE 2 (com Sessão)

require('dotenv').config();
const express = require("express");
const app = express();
const session = require("express-session"); // <-- LINHA DE VOLTA

// ----------------------------------------------------
// BANCO DE DADOS AINDA COMENTADO
// ----------------------------------------------------
// const Conexao = require("./BancoDados/baseDados");
// const {Op} = require("sequelize");
// const http = require('http');
//
// const Classificado = require("./models/Tables/Classificado");
// ... etc ...
// ----------------------------------------------------

// SESSÃO ESTÁ DE VOLTA
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
}))

app.set("view engine","ejs"); // <-- Vamos adicionar de volta
app.use(express.static("public")); // <-- Vamos adicionar de volta

// ROTA DE TESTE
app.get("/", (req, res) => {
  console.log("LOG: Rota / foi acessada!");
  res.status(200).send("Servidor Vercel com SESSÃO está funcionando!");
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

// FIM DO ARQUIVO DE TESTE 2