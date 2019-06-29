import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class registerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
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
    let { firstName, lastName, email, password } = this.state;
    await axios.post('/auth/register', {
      firstName,
      lastName,
      email,
      password
    });
    history.push('/home');
  };

  render() {
    return (
      <div className='register-form'>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label='First Name'
            name='firstName'
            type='text'
            value={this.state.firstName}
            onChange={this.handleChange}
            margin='normal'
          />
          <br />
          <TextField
            label='Last Name'
            name='lastName'
            type='text'
            value={this.state.lastName}
            onChange={this.handleChange}
            margin='normal'
          />
          <br />
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
            Register
          </Button>
        </form>
      </div>
    );
  }
}
