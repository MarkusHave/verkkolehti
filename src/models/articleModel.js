const Sequelize = require('sequelize');
const db = require('../js/database');

const Article = db.define(
    'article',
    {
        article_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        category_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created_at: {
            type: Sequelize.TIME,
            allowNull: false
        },
        updated_at: {
            type: Sequelize.TIME
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = Article;
