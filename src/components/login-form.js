import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: {}
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
    let { data } = await axios.post('/api/users/login', { email: email });
    this.setState({ user: data });
    localStorage.setItem('id', data.id);
    history.push('/portfolio');
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
