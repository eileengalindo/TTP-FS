import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: ''
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
    try {
      event.preventDefault();
      let { firstName, lastName, email, password } = this.state;
      let { data } = await axios.post('/auth/register', {
        firstName,
        lastName,
        email,
        password
      });
      this.props.updateUser(data.id);
      localStorage.setItem('id', data.id);
      history.push('/portfolio');
    } catch (error) {
      this.setState({
        error: error
      });
    }
  };

  render() {
    return (
      <div className='register'>
        <h2 className='register-form-header'>Welcome!</h2>
        <h2 className='register-form-subheader'>
          Register below to begin adding to your portfolio
        </h2>
        <form onSubmit={this.handleSubmit} className='register-form'>
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
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
            margin='normal'
          />
          <br />
          <Button variant='contained' type='submit' color='primary'>
            Register
          </Button>
        </form>
        {this.state.error && this.state.error.response && (
          <h1 className='error'>{this.state.error.response.data} </h1>
        )}
      </div>
    );
  }
}
