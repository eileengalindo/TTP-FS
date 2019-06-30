import React, { Component } from 'react';
import axios from 'axios';
import Portfolio from './portfolio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import updatePrice from './helper-functions/update-price';
import buyFormHandleSubmit from './helper-functions/buy-form-handle-submit';

export default class BuyForm extends Component {
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
    this.updatePrice = updatePrice.bind(this);
    this.buyFormHandleSubmit = buyFormHandleSubmit.bind(this);
  }

  async componentDidMount() {
    let { data } = await axios.get(`/api/stocks/${this.state.id}`);
    let balance = await axios.get(`/api/users/${this.state.id}`);
    this.setState({ stocks: data, balance: balance.data.balance });
    this.interval = setInterval(this.updatePrice, 1000);
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
    this.buyFormHandleSubmit();
  };

  render() {
    return (
      <div className='portfolio-and-buy'>
        <Portfolio stocks={this.state.stocks} balance={this.state.balance} />
        <form onSubmit={this.handleSubmit} className='buy-form'>
          <TextField
            label='Ticker'
            name='ticker'
            type='text'
            value={this.state.ticker}
            onChange={this.handleChange}
            margin='normal'
          />
          <br />
          <TextField
            label='Quantity'
            name='quantity'
            type='text'
            value={this.state.quantity}
            onChange={this.handleChange}
            margin='normal'
          />
          <br />

          <Button
            variant='contained'
            type='submit'
            color='primary'
            align='center'
          >
            Buy
          </Button>
        </form>
      </div>
    );
  }
}
