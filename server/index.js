const express = require('express');
const path = require('path');
const session = require('express-session');
const compression = require('compression');
const db = require('./db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });
const passport = require('passport');
const User = require('./db/models/user');
const app = express();
module.exports = app;

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

sessionStore.sync();
db.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize()); // required to initialize passport
app.use(passport.session()); // required middleware if using persistent sessions

app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
