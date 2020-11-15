const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const auth = require('./auth');
const conf = require('../config');


// get all users
router.get('/', auth.ensureAuthenticated, (req, res) => {
        User.findAll()
            .then((users) => res.send(users))
            .catch((err) => console.log(err));
});


// get one user
router.get('/:id',(req, res) => {
        User.findByPk(req.params.id)
            .then((user) => res.send(user))
            .catch((err) => console.log(err));
});

// new user
router.post('/', auth.ensureAuthenticated, (req, res) => {
    console.log(req.body);
    return User.findOrCreate({
        where: { email: req.body.email },
        defaults: {
            user_id: req.body.user_id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            passwd: bcrypt.hashSync(req.body.passwd, 10)
        }
    }).then((addedUser) => {
        if (addedUser) {
            res.send(addedUser);
        } else {
            res.status(400).send('Error when adding new user');
        }
    });
});

// update user
router.put('/:id', auth.ensureAuthenticated, (req, res, next) => {
    let passwd;
    if (req.body.passwd != null) {
        passwd = bcrypt.hashSync(req.body.passwd, 10);
    } else passwd = User.passwd;
    // console.log(passwd);
    User.update(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            passwd: passwd
        },
        { where: { user_id: req.params.id } }
    )
        .then((rowsUpdated) => {
            res.json(rowsUpdated);
        })
        .catch(next);
});

// delete user
router.delete('/:id', auth.ensureAuthenticated, (req, res) => {
    User.destroy({
        where: { user_id: req.params.id }
    })
        .then((deletedUser) => {
            res.json(deletedUser);
        })
        .catch((err) => {
            res.send(err.parent.sqlMessage);
        });
});

module.exports = router;
