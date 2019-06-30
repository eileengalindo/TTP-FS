import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import groupStocks from './helper-functions/group-stocks';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.groupStocks = groupStocks.bind(this);
  }

  render() {
    return (
      <div className='portolfio-container'>
        <h2 align='center'>Balance: ${this.props.balance}</h2>
        <br />
        <Paper>
          <Table>
            <TableHead id='table-head'>
              <TableRow>
                <TableCell
                  align='center'
                  className='table-cell'
                  style={{ color: 'black' }}
                >
                  Ticker
                </TableCell>
                <TableCell align='center'># of Shares</TableCell>
                <TableCell align='center'>Total Value</TableCell>
              </TableRow>
            </TableHead>
            {this.groupStocks().map(stock => {
              console.log('stock in map', stock.ticker, stock.quantity);
              return (
                <TableBody key={stock.ticker}>
                  {stock.openPrice > stock.latestPrice ? (
                    <TableRow key={stock.ticker}>
                      <TableCell
                        component='th'
                        scope='stock'
                        align='center'
                        style={{ color: 'red' }}
                      >
                        {stock.ticker}
                      </TableCell>
                      <TableCell align='center'>{stock.quantity}</TableCell>
                      <TableCell align='center' style={{ color: 'red' }}>
                        ${stock.totalValue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={stock.ticker}>
                      <TableCell
                        component='th'
                        scope='stock'
                        align='center'
                        style={{ color: 'green' }}
                      >
                        {stock.ticker}
                      </TableCell>
                      <TableCell align='center'>{stock.quantity}</TableCell>
                      <TableCell align='center' style={{ color: 'green' }}>
                        ${stock.totalValue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              );
            })}
          </Table>
        </Paper>
      </div>
    );
  }
}
