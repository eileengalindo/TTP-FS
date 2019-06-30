import React, { Component } from 'react';
import Routes from './routes';
import Navbar from './components/navbar';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem('id')
    };
  }

  render() {
    return (
      <div>
        <Navbar id={this.state.id} updateUser={id => this.setState({ id })} />
        <Routes updateUser={id => this.setState({ id })} id={this.state.id} />
      </div>
    );
  }
}

export default App;
