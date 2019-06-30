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
    let { data } = await axios.post('/auth/login', { email, password });
    this.setState({ user: data });
    this.props.updateUser(data.id);
    localStorage.setItem('id', data.id);
    history.push('/portfolio');
  };

  render() {
    return (
      <div>
        <div className='login'>
          <h2 className='login-header'>Welcome Back!</h2>
          <h2 className='login-sub-header'>
            Use the login in form below to access your account
          </h2>
          <form onSubmit={this.handleSubmit} className='login-form'>
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
              type='password'
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
      </div>
    );
  }
}
