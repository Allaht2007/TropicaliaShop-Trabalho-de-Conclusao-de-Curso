// CÓDIGO NOVO (PostgreSQL / Neon)
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    },
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

module.exports = sequelize;