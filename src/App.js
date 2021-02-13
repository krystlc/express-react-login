import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router, } from 'react-router-dom';
import Home from './Home';
import Secret from './Secret';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/secret">Secret</Link></li>
          </ul>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/secret" component={Secret} />
          </Switch>
        </div>
      </Router>
    );
  }
}
