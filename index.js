// INÍCIO DO ARQUIVO DE TESTE 5 (Verificação Final)

require('dotenv').config();
const express = require("express");
const app = express();
const session = require("express-session"); // <-- LINHA DE VOLTA

// SESSÃO
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365}
}))

app.set("view engine","ejs");
app.use(express.static("public"));

// ROTA DE TESTE (PÁGINA INICIAL)
app.get("/", (req, res) => {
  console.log("LOG: Rota / foi acessada!");
  res.status(200).send("Servidor Vercel (Teste 5) está funcionando! Acesse /test-env para ver o problema.");
});


// ROTA DE TESTE PARA VER AS VARIÁVEIS (MODIFICADA)
app.get("/test-env", (req, res) => {
  console.log("LOG: Verificando variáveis de ambiente...");
  
  // Vamos verificar os primeiros 15 caracteres da URL do banco
  // para ter certeza que ela está sendo carregada, sem expor sua senha.
  const db_url_preview = process.env.DATABASE_URL 
                          ? process.env.DATABASE_URL.substring(0, 15) 
                          : "NÃO ENCONTRADA";

  res.status(200).json({
    session_secret_existe: !!process.env.SESSION_SECRET,
    database_url_existe: !!process.env.DATABASE_URL,
    database_url_preview: db_url_preview 
  });
});


module.exports = app;

// FIM DO ARQUIVO DE TESTE 5