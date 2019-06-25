const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });
const passport = require('passport');
const User = require('./db/models/user');
const app = express();

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

app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '..', 'public')));

const PORT = 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
