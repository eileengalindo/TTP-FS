const router = require('express').Router();
module.exports = router;

router.use('/stocks', require('./stocks'));
router.use('/users', require('./users'));
router.use((req, res, next) => {
  console.log('in error route');
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
