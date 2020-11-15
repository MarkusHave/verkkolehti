const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');
const {ensureAuthenticated} = require('./auth');

// get all categories
router.get('/', (req, res) => {
    Category.findAll()
        .then((category) => {
            res.send(category);
        })
        .catch((err) => console.log(err));
});

// get one category
router.get('/:id', (req, res) => {
    Category.findByPk(req.params.id)
        .then((category) => {
            res.send(category);
        })
        .catch((err) => console.log(err));
});

// new category
router.post('/', ensureAuthenticated, (req, res) => {
    return Category.create({
        category_id: "",
        category_name: req.body.category_name
    }).then((addedCategory) => {
        if (addedCategory) {
            res.send(addedCategory);
        } else {
            res.status(400).send('Error when adding new entry');
        }
    });
});

// update category
router.put('/:id', (req, res, next) => {
    console.log(req.body);
    Category.update(
        {
            category_id: req.body.category_id,
            category_name: req.body.category_name
        },
        { where: { category_id: req.params.id } }
    )
        .then((rowsUpdated) => {
            res.json(rowsUpdated);
        })
        .catch(next);
});

// delete category
router.delete('/:id', (req, res) => {
    Category.destroy({
        where: { category_id: req.params.id }
    }).then((deletedCategory) => {
        res.json(deletedCategory);
    });
});

module.exports = router;
