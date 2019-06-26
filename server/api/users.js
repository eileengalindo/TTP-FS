const router = require('express').Router();
const { User, Stock } = require('../db/models/');
module.exports = router;

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

router.post('/register', async (req, res, next) => {
  try {
    const user = await User.create(req.body); // re-factor later to not use req.body
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    let stock = await Stock.create({
      ticker: req.body.ticker,
      quantity: req.body.quantity,
      totalValue: req.body.totalPrice,
      action: req.body.action,
      userId: req.params.id
    });
    res.json(stock);
  } catch (error) {
    next(error);
  }
});
