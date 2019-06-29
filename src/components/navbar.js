import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
  }
  // classes = useStyles();
  componentDidMount() {
    let userId = localStorage.getItem('id');
    this.setState({ id: userId });
  }
  onClick = async () => {
    localStorage.removeItem('id');
    this.setState({ id: null });
    await axios.post('/auth/logout');
  };
  render() {
    return (
      <div>
        {this.state.id ? (
          <div style={{ flewGrow: 1 }}>
            <AppBar position='static'>
              <Toolbar>
                <Button color='inherit' component={Link} to={'/transactions'}>
                  Transactions
                </Button>
                <Button color='inherit' component={Link} to={'/portfolio'}>
                  Portfolio
                </Button>
                <Typography variant='h6' style={{ flewGrow: 1 }}>
                  tStocks
                </Typography>
                <Button
                  color='inherit'
                  onClick={this.onClick}
                  component={Link}
                  to={'/home'}
                  align='right'
                >
                  Log Out
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        ) : (
          <div style={{ flewGrow: 1 }}>
            <AppBar position='static'>
              <Toolbar>
                <Typography variant='h6' style={{ flewGrow: 1 }}>
                  tStocks
                </Typography>
                <Button color='inherit' component={Link} to={'/login'}>
                  Log In
                </Button>
                <Button color='inherit' component={Link} to={'/register'}>
                  Register
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        )}
      </div>
    );
  }
}
