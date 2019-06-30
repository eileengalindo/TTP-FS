import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {
  componentDidMount() {
    let userId = localStorage.getItem('id');
    this.setState({ id: userId });
  }

  onClick = async () => {
    localStorage.removeItem('id');
    this.props.updateUser(null);
    await axios.post('/auth/logout');
  };
  render() {
    return (
      <div>
        {this.props.id ? (
          <div style={{ flewGrow: 1 }}>
            <AppBar position='static'>
              <Toolbar>
                <Typography variant='h6' style={{ flewGrow: 1 }}>
                  tStocks
                </Typography>
                <Button
                  color='inherit'
                  edge='end'
                  component={Link}
                  to={'/transactions'}
                  style={{ marginLeft: 'auto', marginRight: '-12' }}
                >
                  Transactions
                </Button>
                <Button color='inherit' component={Link} to={'/portfolio'}>
                  Portfolio
                </Button>
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
                <Button
                  color='inherit'
                  component={Link}
                  to={'/login'}
                  style={{ marginLeft: 'auto', marginRight: '-12' }}
                >
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

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function ButtonAppBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
