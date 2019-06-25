import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
export default class registerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
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
    let { firstname, lastname, email, password } = this.state;
    let { data } = await axios.post('/api/users/register', {
      firstname,
      lastname,
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
              name='firstname'
              value={this.state.firstname}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor='text'>
            Last Name
            <input
              type='text'
              name='firstname'
              value={this.state.lastname}
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
