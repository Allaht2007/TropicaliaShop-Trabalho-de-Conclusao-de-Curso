// INÍCIO DO ARQUIVO DE TESTE index.js

require('dotenv').config(); // Vamos manter isso
const express = require("express");
const app = express();

// ----------------------------------------------------
// TODO O CÓDIGO DO BANCO E SESSÃO FOI COMENTADO
// ----------------------------------------------------
// const Conexao = require("./BancoDados/baseDados");
// const session = require("express-session");
// const {Op} = require("sequelize");
// const http = require('http');
//
// const Classificado = require("./models/Tables/Classificado");
// const Info = require("./models/Tables/info");
// const Categ = require("./models/Tables/Categoria");
// ... e todos os outros ...
//
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave:false,
//     saveUninitialized:false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
// }))
// ... todos os app.use() ...
//
// Conexao.authenticate()...
// ----------------------------------------------------


// ROTA DE TESTE
app.get("/", (req, res) => {
  console.log("LOG: Rota / foi acessada!");
  res.status(200).send("Servidor Vercel está funcionando!");
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

// FIM DO ARQUIVO DE TESTE