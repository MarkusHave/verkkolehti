const express = require('express');
const router = express.Router();
const moment = require('moment');
const Article = require('../models/articleModel');
const User = require('../models/userModel');
const auth = require('./auth');
const conf = require('../config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// get all articles
router.get('/', (req, res) => {
        Article.findAll()
            .then((article) => {
                res.send(article);
            })
            .catch((err) => console.log(err));
});

// get one article
router.get('/:id', (req, res) => {
        Article.findByPk(req.params.id)
            .then((article) => {
                // check if article exists
                if (article) {
                    res.send(article);
                } else {
                    // otherwise send empty
                    res.send();
                }
            })
            .catch((err) => console.log(err));
});

// get article with title
router.get('/param/:param', (req, res) => {
        let searchTerm = (req.params.param).toString();
        Article.findAll({
            where: {
                title: {[Op.substring]: `${searchTerm}`}
            }
        })
            .then((articles) => {
                // check if article exists
                res.send(articles);
            })
            .catch((err) => console.log(err));
});


// new article
router.post('/', auth.ensureAuthenticated, (req, res) => {
    let userId = req.session.passport.user;
    return Article.create({
        article_id: "",
        user_id: userId,
        category_id: req.body.category_id,
        title: req.body.title,
        text: req.body.text,
        created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }).then((addedArticle) => {
        if (addedArticle) {
            res.redirect('/');
        } else {
            res.status(400).send('Error when adding new entry');
        }
    });
});

// update article
router.put('/:id', auth.ensureAuthenticated, (req, res, next) => {
    Article.update(
        {
            category_id: req.body.category_id,
            title: req.body.title,
            text: req.body.text,
            updated_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        },
        { where: { article_id: req.params.id } }
    )
        .then((rowsUpdated) => {
            res.json(rowsUpdated);
        })
        .catch(next);
});

// delete article
router.delete('/:id', auth.ensureAuthenticated, (req, res) => {
    Article.destroy({
        where: { article_id: req.params.id }
    }).then((deletedArticle) => {
        res.json(deletedArticle);
    });
});

module.exports = router;
