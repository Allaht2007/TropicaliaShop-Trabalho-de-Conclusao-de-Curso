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
  // Se a URL estiver mal formatada (senha, host, etc.), 
  // o 'new Sequelize' vai falhar e o 'catch' vai capturar.
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
// Em vez de "crashar" o 'require', nós exportamos o erro.
module.exports = {
  Conexao: ConexaoInstancia, // Será 'undefined' se o 'new Sequelize' falhar
  Error: conexaoErro // Será 'null' se funcionar
};