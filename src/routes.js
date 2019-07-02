import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';
import Home from './components/home';
import Transactions from './components/transactions';
import BuyForm from './components/buy-form';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/register'
          render={props => (
            <RegisterForm {...props} updateUser={this.props.updateUser} />
          )}
        />
        <Route
          exact
          path='/login'
          render={props => (
            <LoginForm {...props} updateUser={this.props.updateUser} />
          )}
        />
        {this.props.id && (
          <Switch>
            <Route
              exact
              path='/portfolio'
              render={props => <BuyForm {...props} id={this.props.id} />}
            />
            <Route
              exact
              path='/transactions'
              render={props => <Transactions {...props} id={this.props.id} />}
            />
          </Switch>
        )}
      </Switch>
    );
  }
}
