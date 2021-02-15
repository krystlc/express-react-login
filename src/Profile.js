import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    const { user } = this.props.data
    const buttonClasses = 'py-3 cursor-pointer bg-blue-600 text-white font-semibold px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200'
    return (
      <div className="text-center">
        <h1 className="text-3xl mb-10">Profile</h1>
        <p className="mb-3">Logged in as {user.username}</p>
        <input type="button" value="Logout" onClick={this.props.handleLogout} className={buttonClasses} />
      </div>
    );
  }
}