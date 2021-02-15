import React, { Component } from 'react';
import Login from './Login';
import Profile from './Profile';

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
        <div className="bg-white mx-auto p-10 rounded w-1/3 shadow-xl">
          {this.state.user
            ? (<Profile data={this.state.user} handleLogout={this.handleLogout} />)
            : (<Login handleLogin={this.handleLogin} />)}
        </div>
        <pre>{JSON.stringify(this.state.user, null, 2)}</pre>
      </div>
    )
  }
}
