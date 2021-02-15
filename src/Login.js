import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busy: false,
      username: '',
      password: '',
      errMessage: null,
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
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(user => {
        if ('error' in user) {
          that.setState({
            username: '',
            password: '',
            busy: false,
            errMessage: user.error,
          })
        } else {
          that.props.handleLogin({
            user
          })
        }
      })
      .catch(err => {
        console.log(err)
        that.setState({
          errMessage: 'An unexpected errror occurred',
        })
      })
  }

  render() {
    const inputClasses = 'border text-gray-800 appearance-none block w-full rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-3'
    const buttonClasses = 'w-full py-3 cursor-pointer bg-blue-600 text-white font-semibold px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200'
    let errMessage
    if (this.state.errMessage) {
      errMessage = <p className="text-red-400 mb-5">{this.state.errMessage}</p>
    }
    return (
      <div>
        <h1 className="text-3xl mb-10 text-center">Log in</h1>
        {errMessage}
        <form onSubmit={this.onSubmit} className={this.state.busy ? 'animate-pulse' : null}>
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
      </div>
    );
  }
}