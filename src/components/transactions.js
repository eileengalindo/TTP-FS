import React, { Component } from 'react';
import axios from 'axios';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { dateFormat } from './helper-functions/date-format';
import numberWithCommas from './helper-functions/add-commas-to-numbers';

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
      <div className='transactions-container'>
        <h1 align='center' className='transactions-header'>
          Transactions
        </h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='center'>Ticker</TableCell>
                <TableCell align='center'># of Shares</TableCell>
                <TableCell align='center'>Price per Share</TableCell>
              </TableRow>
            </TableHead>
            {this.state.stocks.map(stock => {
              return (
                <TableBody key={stock.id}>
                  <TableRow>
                    <TableCell component='th' scope='stock' align='center'>
                      {dateFormat(stock.createdAt)}
                    </TableCell>
                    <TableCell component='th' scope='stock' align='center'>
                      {stock.ticker}
                    </TableCell>
                    <TableCell align='center'>{stock.quantity}</TableCell>
                    <TableCell align='center'>
                      $
                      {numberWithCommas(
                        (stock.totalValue / stock.quantity).toFixed(2)
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </Paper>
      </div>
    );
  }
}
