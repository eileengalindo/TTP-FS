const router = require('express').Router();
const { User, Stock } = require('../db/models/');
module.exports = router;

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
    } else {
      res.status(401).send('Insufficient cash');
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (req.body.balance > req.body.totalPrice) {
      let updatedUser = await User.update(
        {
          balance: req.body.balance - req.body.totalPrice,
          portfolioValue: req.body.value + req.body.totalPrice
        },

        {
          returning: true,
          where: {
            id: req.params.id
          }
        }
      );
      res.json({
        balance: updatedUser[1][0].dataValues.balance,
        portfolioValue: updatedUser[1][0].portfolioValue
      });
    } else {
      res.status(400).send('Current balance is too low');
    }
  } catch (error) {
    next(error);
  }
});
