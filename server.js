const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// Server port
const PORT = require('./src/config').PORT;
// Server database
const db = require('./src/js/database');
// User info handling
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const User = require('./src/models/userModel');
const uuid = require('uuid/v4');
// Cookie handling
const cookieParser = require('cookie-parser');
const auth = require('./src/js/auth');
const logger = require('./src/js/logger');

// Create the server
const app = express();

// configure passport.js to use the local strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, passwd, done) => {
    // Call to database; find the user with entered email
    User.findOne({ where: { email: email } }).then((user) => {
      console.log(user);
      if (!user) {
        return done(null, false);
      }
      // Check entered password
      bcrypt.compare(passwd, user.passwd, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          console.log(user);
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

// Tell passport how to serialize User
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
  const user = app.get(`/users/${id}`, (req, res) => {});
  done(null, user);
});

// FOR LOGGING
app.use(logger);

// Connection test
db
  .authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => console.log('Error' + err));

//  CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const fs = new FileStore({
  secret: 'kamaleontti'
});

// Add and conf middleware
app.use(cookieParser());
// app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(
  session({
    genid: (req) => {
      return uuid(); // use UUIDs for session IDs
    },
    store: fs,
    secret: 'yeet22',
    resave: false,
    saveUninitialized: true,
    maxAge: 1
  })
);

// Init and conifg passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/cl', (req, res) => {
  res.json(req.session);
});

// Auth login
app.post('/auth', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    req.login(user, (err) => {
      res.redirect('/loggedin');
    });
  })(req, res, next);
});

app.get('/a', auth.ensureAuthenticated, (req, res) => {
  res.send('you hit the authentication endpoint\n');
});

// logged states
app.get('/loggedin', auth.ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/loggedout', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/loginfirst', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Logout
app.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect('/loggedout');
  } else {
    res.redirect('/loginfirst');
  }
});

// app uses static path from build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/article/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/auth/login', auth.forwardAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/new', auth.ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/account', auth.ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/articles', require('./src/js/articleRoutes'));
app.use('/users', require('./src/js/userRoutes'));
app.use('/categories', require('./src/js/categoryRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
