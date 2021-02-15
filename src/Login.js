import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busy: false,
      username: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const that = this
    this.setState({
      busy: true,
    })
    fetch('/api/signin', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then(res => res.json())
      .then(user => { 
        that.props.handleLogin({
          user
        })
      })
  }

  render() {
    const inputClasses = 'border text-gray-800 appearance-none block w-full rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-3'
    const buttonClasses = 'w-full py-3 cursor-pointer bg-purple-600 text-white font-semibold px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200'
    return (
      <form onSubmit={this.onSubmit} className={this.state.busy ? 'animate-pulse' : null}>
        <h1 className="text-3xl mb-10 text-center">Log in</h1>
        <input
          type="email"
          name="username"
          className={inputClasses}
          placeholder="Enter email"
          value={this.state.username}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          className={inputClasses}
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit" className={buttonClasses} disabled={this.state.busy} />
      </form>
    );
  }
}