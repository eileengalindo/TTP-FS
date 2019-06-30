import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoneyIcon from '../money.svg';
import PortfolioIcon from '../portfolio.svg';
import ListIcon from '../list.svg';
import Button from '@material-ui/core/Button';

export default class home extends Component {
  render() {
    return (
      <div>
        <h1 className='homepage-header'>Capito</h1>
        <div className='homepage-container'>
          <div className='icon-container'>
            <img src={MoneyIcon} alt='Logo' width='150' height='150' />
            <p id='description'>Purchase Stocks</p>
          </div>
          <div className='icon-container'>
            <img src={PortfolioIcon} alt='Logo' width='150' height='150' />
            <p id='description'>View Portfolio</p>
          </div>
          <div className='icon-container'>
            <img src={ListIcon} alt='Logo' width='150' height='150' />
            <p id='description'>View Transactions</p>
          </div>
        </div>
        <div className='button-container'>
          <Button
            className='button'
            variant='contained'
            type='submit'
            color='primary'
            align='center'
            component={Link}
            to={'/login'}
          >
            Log In
          </Button>
          <Button
            className='button'
            variant='contained'
            type='submit'
            color='primary'
            align='center'
            component={Link}
            to={'/register'}
          >
            Register
          </Button>
        </div>
      </div>
    );
  }
}
