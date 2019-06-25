const router = require('express').Router();
const { User } = require('../db/models/');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    console.log('getting users');
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});
