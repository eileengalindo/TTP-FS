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
    console.log('in back end route', req.body.email);
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});
