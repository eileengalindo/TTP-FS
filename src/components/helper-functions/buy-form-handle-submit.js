import axios from 'axios';

async function buyFormHandleSubmit() {
  let { ticker, quantity, balance, value } = this.state;
  ticker = ticker.toUpperCase();
  let { data } = await axios.get(
    `https://api.iextrading.com/1.0/stock/${ticker}/book`
  );
  let stockPrice = data.quote.latestPrice;
  let openPrice = data.quote.open;
  let totalPrice = Number(quantity * stockPrice);
  let newStock = await axios.post(`/api/users/${this.state.id}`, {
    ticker,
    quantity,
    totalPrice,
    action: 'buy',
    balance
  });
  let updatedBalanceAndValue = await axios.put(`/api/users/${this.state.id}`, {
    totalPrice,
    balance,
    value
  });
  newStock.data.openingPrice = openPrice;
  newStock.data.lastestPrice = data.quote.latestPrice;
  this.setState({
    stocks: [...this.state.stocks, newStock.data],
    balance: Number(updatedBalanceAndValue.data.balance),
    value: Number(updatedBalanceAndValue.data.portfolioValue),
    ticker: '',
    quantity: ''
  });
}

export default buyFormHandleSubmit;
