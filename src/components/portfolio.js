import React, { Component } from 'react';
import axios from 'axios';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      quantity: 0,
      id: localStorage.getItem('id'),
      stocks: []
    };
  }
  async componentDidMount() {
    console.log(this.state.id);
    let { data } = await axios.get(`/api/stocks/${this.state.id}`);
    this.setState({ stocks: data });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    let { ticker, quantity } = this.state;
    let { data } = await axios.get(
      `https://api.iextrading.com/1.0/stock/${ticker}/book`
    );
    let stockPrice = data.quote.latestPrice;
    let totalPrice = quantity * stockPrice;
    let newStock = await axios.post(`/api/users/${this.state.id}`, {
      ticker,
      quantity,
      totalPrice,
      action: 'buy'
    });
    this.setState({ stocks: [...this.state.stocks, newStock.data] });
  };
  render() {
    return (
      <div>
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
