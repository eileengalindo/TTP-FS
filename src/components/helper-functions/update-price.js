import axios from 'axios';

async function updatePrice() {
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
    let copyState = this.state.stocks.slice(0);
    let newArr = copyState.map((element, index) => {
      if (element.ticker === newStock.ticker) {
        return (copyState[index] = newStock);
      } else {
        return (copyState[index] = element);
      }
    });
    this.setState({
      stocks: newArr
    });
  }
}

export default updatePrice;
