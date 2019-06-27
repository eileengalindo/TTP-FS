import React, { Component } from 'react';
import axios from 'axios';
// import throttle from 'lodash/throttle';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      quantity: '',
      id: localStorage.getItem('id'),
      stocks: [],
      balance: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    let { data } = await axios.get(`/api/stocks/${this.state.id}`);
    let balance = await axios.get(`/api/users/${this.state.id}`);
    this.setState({ stocks: data, balance: balance.data.balance });
    this.interval = setInterval(async () => {
      for (let i = 0; i < this.state.stocks.length; i++) {
        let currentStock = this.state.stocks[i];
        let { ticker, quantity } = currentStock;
        let { data } = await axios.get(
          `https://api.iextrading.com/1.0/stock/${ticker}/book`
        );
        let newStock = {
          ticker,
          quantity,
          totalValue: Number(quantity * data.quote.latestPrice)
        };
        let copyState = this.state.stocks.slice(0);
        copyState.forEach((element, index) => {
          if (element.ticker === newStock.ticker) {
            copyState[index] = newStock;
          }
        });

        this.setState({
          stocks: copyState
        });
      }
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    let { ticker, quantity, balance } = this.state;
    ticker = ticker.toUpperCase();
    let { data } = await axios.get(
      `https://api.iextrading.com/1.0/stock/${ticker}/book`
    );
    let stockPrice = data.quote.latestPrice;
    let totalPrice = Number(quantity * stockPrice);
    let newStock = await axios.post(`/api/users/${this.state.id}`, {
      ticker,
      quantity,
      totalPrice,
      action: 'buy',
      balance
    });
    let updatedBalance = await axios.put(`/api/users/${this.state.id}`, {
      totalPrice,
      balance
    });

    this.setState({
      stocks: [...this.state.stocks, newStock.data],
      balance: updatedBalance.data
    });
  };

  groupStocks() {
    let a = this.state.stocks.slice(0);
    let returnArr = [];
    let hash = {};
    for (let i = 0; i < a.length; i++) {
      let stock = a[i];
      let { quantity, totalValue, ticker } = stock;

      if (!hash[ticker]) {
        hash[ticker] = [quantity, Number(totalValue)];
      } else {
        let currentQuantity = hash[ticker][0];
        let currentTotalValue = hash[ticker][1];
        let newQuantity = currentQuantity + quantity;
        let newTotalValue = Number(currentTotalValue) + Number(totalValue);

        hash[ticker][0] = newQuantity;
        hash[ticker][1] = newTotalValue;
      }
    }

    for (let stock in hash) {
      returnArr.push({
        ticker: stock,
        quantity: hash[stock][0],
        totalValue: hash[stock][1]
      });
    }
    return returnArr;
  }

  render() {
    return (
      <div>
        <h2>Balance: ${this.state.balance}</h2>
        {this.groupStocks().map(stock => {
          return (
            <div key={stock.ticker}>
              <h2>Stock: {stock.ticker}</h2>
              <h2># of shares: {stock.quantity}</h2>
              <h2>Value: ${stock.totalValue.toFixed(2)}</h2>
            </div>
          );
        })}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='ticker'>
            Ticker
            <input
              type='text'
              value={this.state.ticker}
              name='ticker'
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor='quantity'>
            Quantity
            <input
              type='text'
              name='quantity'
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </label>
          <button type='submit'>Buy</button>
        </form>
      </div>
    );
  }
}
