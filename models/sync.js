// Carrega o .env (DATABASE_URL)
require('dotenv').config();

const Conexao = require("../BancoDados/baseDados.js");


require("./Tables/Avaliacao");
require("./Tables/Carrinho");
require("./Tables/CarrinhoClass");
require("./Tables/Categoria");
require("./Tables/Classificado");
require("./Tables/Compras");
require("./Tables/Fav");
require("./Tables/Usuario");
require("./Tables/info");


console.log("Iniciando sincronização forçada com o banco Neon...");
console.log("Isso vai apagar e recriar todas as tabelas...");

Conexao.sync({ force: true })
  .then(() => {
    console.log("✅ Tabelas recriadas com sucesso no Neon!");
    console.log("As colunas 'createdAt' e 'updatedAt' não devem mais existir.");
    process.exit(0); // Sai do script com sucesso
  })
  .catch((err) => {
    console.error("❌ Erro ao sincronizar o banco de dados:", err);
    process.exit(1); // Sai do script com erro
  });