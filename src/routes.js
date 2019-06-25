import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import loginForm from './components/login-form';
import registerForm from './components/register-form';
import Home from './components/home';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={loginForm} />
        <Route exact path='/register' component={registerForm} />
      </Switch>
    );
  }
}
