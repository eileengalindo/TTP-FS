import React, { Component } from 'react';
import axios from 'axios';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      quantity: 0,
      id: localStorage.getItem('id'),
      stocks: [],
      balance: 0
    };
  }
  async componentDidMount() {
    let { data } = await axios.get(`/api/stocks/${this.state.id}`);
    let balance = await axios.get(`/api/users/${this.state.id}`);
    this.setState({ stocks: data, balance: balance.data.balance });
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
    let totalPrice = quantity * stockPrice;
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
  render() {
    return (
      <div>
        <h2>Balance: ${this.state.balance}</h2>
        {this.state.stocks.map(stock => {
          return (
            <div key={stock.id}>
              <h2>Stock: {stock.ticker}</h2>
              <h2># of shares: {stock.quantity}</h2>
              <h2>Value: ${stock.totalValue}</h2>
            </div>
          );
        })}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='ticker'>
            Ticker
            <input
              type='text'
              name='ticker'
              value={this.state.ticker}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor='quantity'>
            Quantity
            <input
              type='text'
              name='quantity'
              // value={this.state.quantity}
              onChange={this.handleChange}
            />
          </label>
          <button type='submit'>Buy</button>
        </form>
      </div>
    );
  }
}
