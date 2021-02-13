import React, { Component } from 'react';
import Login from './Login';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      user: null,
    }
  }
  render() {
    return (
      <div>
        <h1>Log in</h1>
        <pre>{ this.state.user }</pre>
        <Login />
      </div>
    )
  }
}
