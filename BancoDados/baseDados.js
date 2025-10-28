// ==========================================================
// ADICIONE ESTA LINHA "FALSA" NO TOPO DO ARQUIVO
// ==========================================================
try { require('pg'); } catch (e) { /* não faz nada, só para forçar o builder */ }
// ==========================================================

require('dotenv').config();
const { Sequelize } = require('sequelize');

let ConexaoInstancia = null;
let conexaoErro = null;

try {
  // Verificação que já sabemos que funciona
  if (!process.env.DATABASE_URL) {
    throw new Error("ERRO NO baseDados.js: VARIÁVEL DATABASE_URL NÃO FOI ENCONTRADA.");
  }

  // O PONTO CRÍTICO:
  ConexaoInstancia = new Sequelize(process.env.DATABASE_URL, {
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

} catch (err) {
  // Se o 'new Sequelize' falhar, nós capturamos o erro aqui
  console.error("ERRO CRÍTICO no construtor do Sequelize:", err);
  conexaoErro = err; // Armazenamos o erro
}

// Exportamos um objeto que nos diz o que aconteceu
module.exports = {
  Conexao: ConexaoInstancia, // Será 'undefined' se o 'new Sequelize' falhar
  Error: conexaoErro // Será 'null' se funcionar
};