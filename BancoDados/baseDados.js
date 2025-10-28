// Adiciona o dotenv aqui também, por segurança
require('dotenv').config();

const { Sequelize } = require('sequelize');

// PASSO 1: Criar uma verificação que a Vercel VAI logar
if (!process.env.DATABASE_URL) {
  // Se a URL não for encontrada, ele vai "crashar" com uma mensagem de erro
  // que a Vercel CONSEGUE mostrar nos logs.
  throw new Error("ERRO CRÍTICO: VARIÁVEL DATABASE_URL NÃO FOI ENCONTRADA.");
}

// PASSO 2: Configuração correta para o Neon (PostgreSQL)
const Conexao = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  
  // Configurações de SSL necessárias para o Neon
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Necessário para evitar erros de certificado
    }
  },
  
  // Desabilitar os timestamps (createdAt/updatedAt) que você não queria
  define: {
    timestamps: false,
    freezeTableName: true
  },

  // Desabilita os logs de cada query SQL no log da Vercel
  logging: false 
});

module.exports = Conexao;