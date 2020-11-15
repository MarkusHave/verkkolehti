const Sequelize = require('sequelize');
const config = require('../config');

module.exports = new Sequelize(config.database, config.dbUser, config.dbPasswd, {
    host: config.dbHost,
    dialect: config.dbDialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

