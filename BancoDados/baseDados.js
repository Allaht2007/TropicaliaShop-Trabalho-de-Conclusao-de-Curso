// No arquivo BancoDados/baseDados.js
require('dotenv').config(); // <-- dotenv por segurança

const { Sequelize } = require('sequelize');

if (!process.env.DATABASE_URL) {
  throw new Error("ERRO CRÍTICO: VARIÁVEL DATABASE_URL NÃO FOI ENCONTRADA.");
}

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

module.exports = Conexao;