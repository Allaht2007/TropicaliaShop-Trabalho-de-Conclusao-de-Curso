// INÍCIO DO ARQUIVO DE TESTE 4 (Carregando o DB, sem autenticar)

require('dotenv').config();
const express = require("express");
const app = express();
const session = require("express-session");

// ----------------------------------------------------
// ADICIONANDO O BANCO DE DADOS (APENAS O 'REQUIRE')
// ----------------------------------------------------
// (Certifique-se que o baseDados.js é o que eu te passei)
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

// ----------------------------------------------------
// BLOCO AUTHENTICATE FOI REMOVIDO
// ----------------------------------------------------
// Conexao.authenticate().then(()=>{  
//     console.log("LOG: Conexão com DB (authenticate) OK!");
// }).catch((erro)=>{
//     console.error("ERRO CRÍTICO NO AUTHENTICATE:", erro);
// })
// ----------------------------------------------------

// ROTA DE TESTE
app.get("/", (req, res) => {
  console.log("LOG: Rota / foi acessada!");
  res.status(200).send("Teste 4 (DB carregado, sem authenticate) FUNCIONOU!");
});

// ... (O app.get("/test-env", ...) pode ficar aqui) ...

module.exports = app;

// FIM DO ARQUIVO DE TESTE 4