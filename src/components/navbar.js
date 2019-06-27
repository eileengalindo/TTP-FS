import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to={'/transactions'}>
            Transactions
          </Button>
          <Button color='inherit' component={Link} to={'/portfolio'}>
            Portfolio
          </Button>
          <Typography variant='h6' className={classes.title}>
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
  );
}
