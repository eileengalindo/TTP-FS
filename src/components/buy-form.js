import React, { Component } from 'react';
import axios from 'axios';
import Portfolio from './portfolio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import updatePrice from './helper-functions/update-price';
import buyFormHandleSubmit from './helper-functions/buy-form-handle-submit';
import numberWithCommas from './helper-functions/add-commas-to-numbers';

export default class BuyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      quantity: '',
      stocks: [],
      balance: 0,
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePrice = updatePrice.bind(this);
    this.buyFormHandleSubmit = buyFormHandleSubmit.bind(this);
  }

  async componentDidMount() {
    let { data } = await axios.get(`/api/stocks/${this.props.id}`);
    let user = await axios.get(`/api/users/${this.props.id}`);
    this.setState({
      stocks: data,
      balance: Number(user.data.balance),
      value: Number(user.data.portfolioValue)
    });
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
        <Portfolio
          stocks={this.state.stocks}
          portfolioValue={this.state.value}
        />
        <div buy-form-container>
          <h2 className='buy-form-header'>
            Cash: ${numberWithCommas(this.state.balance.toFixed(2))}
          </h2>
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
      </div>
    );
  }
}
