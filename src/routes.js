import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import loginForm from './components/login-form';
import Home from './components/home';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/' component={loginForm} />
      </Switch>
    );
  }
}
