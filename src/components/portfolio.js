import React, { Component } from 'react';
import axios from 'axios';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      quantity: 0
    };
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
    let id = localStorage.getItem('id');
    await axios.post(`/api/users/${id}`, {
      ticker,
      quantity,
      totalPrice,
      action: 'buy'
    });
  };
  render() {
    return (
      <div>
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
