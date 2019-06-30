const isAuthenticated = (req, res, next) => {
  try {
    if (req.user) {
      return next();
    } else {
      res.redirect(301, '/home');
    }
  } catch (e) {
    res.redirect(301, '/home');
  }
};

module.exports = isAuthenticated;
