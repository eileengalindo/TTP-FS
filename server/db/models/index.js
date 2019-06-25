const User = require('./user');
const Stock = require('./stocks');

User.hasMany(Stock);
Stock.belongsTo(User);

module.exports = {
  User,
  Stock
};
