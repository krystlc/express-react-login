import React, { Component } from 'react';
import Login from './Login';
import Profile from './Profile';

const containerStyle = {
  minWidth: '280px',
  maxWidth: '420px',
}

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin(user) {
    this.setState({
      user
    })
  }

  handleLogout() {
    this.setState({
      user: null,
    })
  }

  render() {
    return (
      <div className="flex flex-col h-full justify-center align-middle text-gray-600">
        <div className="bg-white mx-auto p-10 rounded shadow-xl" style={containerStyle}>
          {this.state.user
            ? (<Profile data={this.state.user} handleLogout={this.handleLogout} />)
            : (<Login handleLogin={this.handleLogin} />)}
        </div>
      </div>
    )
  }
}
