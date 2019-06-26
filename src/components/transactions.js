import React, { Component } from 'react';
import axios from 'axios';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      stocks: {}
    };
  }
}
