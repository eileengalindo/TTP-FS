const router = require('express').Router();
const { Stock } = require('../db/models/');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    let stocks = await Stock.findAll({
      where: {
        userId: req.params.id
      },
      order: [['updatedAt', 'DESC']]
    });
    res.json(stocks);
  } catch (error) {
    next(error);
  }
});
