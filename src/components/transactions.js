import React, { Component } from 'react';
import axios from 'axios';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      id: localStorage.getItem('id')
    };
  }

  async componentDidMount() {
    let { data } = await axios.get(`/api/stocks/${this.state.id}`);
    this.setState({ stocks: data });
  }
  render() {
    return (
      <div>
        {this.state.stocks.map(stock => {
          return (
            <div key={stock.id}>
              <h2>Stock: {stock.ticker}</h2>
              <h2># of shares: {stock.quantity}</h2>
              <h2>Price: ${stock.totalValue / stock.quantity}</h2>
            </div>
          );
        })}
      </div>
    );
  }
}
