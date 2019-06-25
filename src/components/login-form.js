import React, { Component } from 'react';

export default class loginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className='Login'>
        <form onSubmit={this.handleSubmit} />
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
      </div>
    );
  }
}
