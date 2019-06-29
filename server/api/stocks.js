const router = require('express').Router();
const { Stock } = require('../db/models/');
const { isAuthenticated } = require('./authenticate');
module.exports = router;

router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    if (req.session && req.session.passport) {
      let stocks = await Stock.findAll({
        where: {
          userId: req.params.id
        },
        order: [['updatedAt', 'DESC']]
      });
      res.json(stocks);
    }
  } catch (error) {
    next(error);
  }
});
