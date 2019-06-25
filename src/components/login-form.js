import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
export default class loginForm extends Component {
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
    let { email } = this.state;
    console.log(email);
    let { data } = await axios.post('/api/users/login', { email: email });
    console.log(data);
    history.push('/home');
  };

  render() {
    return (
      <div className='Login'>
        <form onSubmit={this.handleSubmit}>
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
          <button type='submit'>log in</button>
        </form>
      </div>
    );
  }
}
