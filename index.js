require('dotenv').config();
const express = require("express");
const app = express();
const session = require("express-session");

// --- MUDANÇA IMPORTANTE ---
// Agora importamos o objeto de debug
const dbInfo = require("./BancoDados/baseDados");

// Verificamos se a conexão falhou JÁ AQUI
if (dbInfo.Error) {
    // Isso deve FINALMENTE aparecer nos logs
    console.error("ERRO CAPTURADO PELO INDEX.JS:", dbInfo.Error);
}

// Pegamos a conexão (pode ser undefined)
const Conexao = dbInfo.Conexao; 
const {Op} = require("sequelize"); 
// --- FIM DA MUDANÇA ---

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
}))

app.set("view engine","ejs");
app.use(express.static("public"));

// ROTA DE TESTE
app.get("/", (req, res) => {
  console.log("LOG: Rota / foi acessada!");
  
  if (dbInfo.Error) {
    // Se o banco falhou ao carregar, mostre o erro na tela
    res.status(500).send("Teste 7 FALHOU. Erro ao carregar baseDados.js: " + dbInfo.Error.message);
  } else if (!Conexao) {
    // Se o Conexao for undefined por outro motivo
    res.status(500).send("Teste 7 FALHOU. Conexao é undefined, mas não há erro.");
  } else {
    // Se funcionou
    res.status(200).send("TESTE 7 (try-catch) FUNCIONOU! O banco foi carregado sem 'crashar'.");
  }
});

module.exports = app;