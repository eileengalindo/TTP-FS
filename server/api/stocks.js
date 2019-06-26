const router = require('express').Router();
const { Stock } = require('../db/models/');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    let stocks = await Stock.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.json(stocks);
  } catch (error) {
    next(error);
  }
});
