const Sequelize = require('sequelize');
const db = require('../js/database');

const Category = db.define(
    'category',
    {
        category_id: {
            type: Sequelize.INTEGER,
            defaultValue: Sequelize.UUIDV4,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        category_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = Category;
