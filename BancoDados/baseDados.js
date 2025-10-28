// ==========================================================
// LINHA CRÍTICA PARA FORÇAR O BUILDER DA VERCEL
// ==========================================================
try { require('pg'); } catch (e) { /* não faz nada, só para forçar o builder */ }
// ==========================================================

require('dotenv').config();
const { Sequelize } = require('sequelize');

if (!process.env.DATABASE_URL) {
  // Isso vai "crashar" o deploy com um log claro se a URL sumir
  console.error("ERRO CRÍTICO NO baseDados.js: VARIÁVEL DATABASE_URL NÃO FOI ENCONTRADA.");
  throw new Error("ERRO CRÍTICO: VARIÁVEL DATABASE_URL NÃO FOI ENCONTRADA.");
}

// Configuração final para o Neon (com SSL e sem timestamps)
const Conexao = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: false
  },
  logging: false 
});

// Exporta a conexão diretamente, como seu código original espera
module.exports = Conexao;