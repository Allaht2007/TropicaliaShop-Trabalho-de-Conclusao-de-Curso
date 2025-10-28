// No arquivo index.js (Teste 4)
require('dotenv').config();
const express = require("express");
const app = express();
const session = require("express-session");

const Conexao = require("./BancoDados/baseDados"); // <-- Carregando o DB
const {Op} = require("sequelize"); // <-- Carregando o Sequelize

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
}))

app.set("view engine","ejs");
app.use(express.static("public"));

// Bloco Authenticate AINDA REMOVIDO

app.get("/", (req, res) => {
  console.log("LOG: Rota / foi acessada!");
  res.status(200).send("Teste 4 (com URL corrigida) FUNCIONOU!");
});

module.exports = app;