import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar';
import Jumbotron from '../components/Jumbotron';
import Login from './Login';
import DashboardWrapper from './DashboardWrapper';
import Settings from './Settings';

import helpers from '../utils/helpers';

// Create the Main component
class Main extends Component {

  state = {
    logged: false,
    user: {},
    currentProvider: '',
    dbUser: {}
  }

  nodes = {}

  authFunctions = {
    setNodeRef: (provider, node) => {
      if (node) {
        this.nodes[ provider ] = node
      }
    },

    onLoginSuccess : (user) => {
      console.log(user)

      this.setState({
        logged: true,
        currentProvider: user._provider,
        user
      })

      helpers.postUser(user)
      .then((data) => {
        console.log(data);
        this.setState({ dbUser: data.data });
      });
    },

    onLoginFailure : (err) => {
      console.error(err)

      this.setState({
        logged: false,
        currentProvider: '',
        user: {}
      })
    },

    onLogoutSuccess : () => {
      this.setState({
        logged: false,
        currentProvider: '',
        user: {}
      })
    },

    onLogoutFailure : (err) => {
      console.error(err)
    },

    logout : () => {
      const { logged, currentProvider } = this.state

      if (logged && currentProvider) {
        this.nodes[currentProvider].props.triggerLogout()
      }
    }
  }

  render() {

    return (
      <Router>
        <div className="main-container">
          <Navbar user={this.state.user !== null && this.state.user._profile} logout={this.authFunctions.logout}  />
          {!this.state.logged && <Jumbotron />}
          <Switch>

            <Route 
              path="/login" 
              // component={Login} 
              render={(props) => 
                <Login
                  fn={this.authFunctions}
                  state={this.state}
                  {...props} 
                />
              }
            />
            <Route 
              path="/dashboard" 
              // component={DashboardWrapper} 
              render={(props) => 
                <DashboardWrapper
                  isLoggedIn={this.state.logged}
                  user={this.state.dbUser}
                  {...props} 
                />
              }
            />
            <Route 
              path="/settings" 
              // component={Settings} 
              render={(props) => 
                <Settings
                  isLoggedIn={this.state.logged}
                  user={this.state.dbUser}
                  {...props} 
                />
              }
            />

          </Switch>

        </div>
      </Router>
    );
  }
};

// Export the module back to the route
export default Main;