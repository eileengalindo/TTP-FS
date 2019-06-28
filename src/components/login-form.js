import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    let { email, password } = this.state;
    let { data } = await axios.post('/api/users/login', { email, password });
    this.setState({ user: data });
    localStorage.setItem('id', data.id);
    history.push('/portfolio');
  };

  render() {
    return (
      <div className='login-form'>
        <h2>Welcome Back!</h2>
        <h2>Use the login in form below to access your account</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label='E-mail'
            name='email'
            type='text'
            value={this.state.email}
            onChange={this.handleChange}
            margin='normal'
          />
          <br />
          <TextField
            label='Password'
            name='password'
            type='text'
            value={this.state.password}
            onChange={this.handleChange}
            margin='normal'
          />
          <br />
          <Button variant='contained' type='submit' color='primary'>
            Log In
          </Button>
        </form>
      </div>
    );
  }
}
