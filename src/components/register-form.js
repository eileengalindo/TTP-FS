import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
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
    console.log('firstname', firstName);
    let { data } = await axios.post('/api/users/register', {
      firstName,
      lastName,
      email,
      password
    });
    console.log(data);
    history.push('/home');
  };

  render() {
    return (
      <div className='Login'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='text'>
            First Name
            <input
              type='text'
              name='firstName'
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor='text'>
            Last Name
            <input
              type='text'
              name='lastName'
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor='email'>
            email
            <input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor='password'>
            password
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button type='submit'>Register</button>
        </form>
      </div>
    );
  }
}
