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

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();

  // res.redirect('/home');
});

router.get('/:id', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    if (req.body.balance > req.body.totalPrice) {
      let stock = await Stock.create({
        ticker: req.body.ticker,
        quantity: req.body.quantity,
        totalValue: req.body.totalPrice,
        action: req.body.action,
        userId: req.params.id
      });
      res.json(stock);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (req.body.balance > req.body.totalPrice) {
      let updatedUser = await User.update(
        { balance: req.body.balance - req.body.totalPrice },
        {
          returning: true,
          where: {
            id: req.params.id
          }
        }
      );
      res.json(updatedUser[1][0].dataValues.balance);
    } else {
      res.status(400).send('Current balance is too low');
    }
  } catch (error) {
    next(error);
  }
});
