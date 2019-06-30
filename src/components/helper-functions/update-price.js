import axios from 'axios';

async function updatePrice() {
  let newArr = [];
  for (let i = 0; i < this.state.stocks.length; i++) {
    let currentStock = this.state.stocks[i];
    let { ticker, quantity } = currentStock;
    let { data } = await axios.get(
      `https://api.iextrading.com/1.0/stock/${ticker}/book`
    );

    let newStock = {
      ticker,
      quantity,
      totalValue: Number(quantity * data.quote.latestPrice),
      openPrice: data.quote.open,
      latestPrice: data.quote.latestPrice
    };
    newArr.push(newStock);
  }
  this.setState({
    stocks: newArr
  });
}

export default updatePrice;
