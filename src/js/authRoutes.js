// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const auth = require('./auth');
// const User = require('../models/userModel');
// const LocalStrategy = require('passport-local').Strategy;


// // configure passport.js to use the local strategy
// passport.use(
//     new LocalStrategy({ usernameField: 'email' }, (email, passwd, done) => {
//         // Call to database; find the user with entered email
//         User.findOne({ where: { email: email } }).then((user) => {
//             console.log(user);
//             if (!user) {
//                 return done(null, false, { message: 'That email is not registered' });
//             }
//             // Check entered password
//             bcrypt.compare(passwd, user.passwd, (err, isMatch) => {
//                 if (err) throw err;
//                 if (isMatch) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false, { message: 'Password incorrect' });
//                 }
//             });
//         });
//     })
// );

// // Tell passport how to serialize User
// passport.serializeUser((user, done) => {
//     done(null, user.user_id);
// });

// router.get('/', (req, res) => {
//     res.redirect('localhost:8080');
// });

// // Login
// router.post('/', (req, res, next) => {
//     console.log('Authentication post callback');
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/auth/login',
//         failureFlash: true
//     })(req, res, next);
// });

// // Logout
// router.get('/logout', auth.ensureAuthenticated, (req, res) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/');
// });

// module.exports = router;
