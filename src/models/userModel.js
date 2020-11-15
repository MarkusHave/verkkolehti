const Sequelize = require('sequelize');
const db = require('../js/database');

const User = db.define(
    'user',
    {
        user_id: {
            type: Sequelize.INTEGER,
            defaultValue: Sequelize.UUIDV4,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        passwd: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = User;
