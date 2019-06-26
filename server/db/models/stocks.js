const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  action: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalValue: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Stock;
