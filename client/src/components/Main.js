// Include React as a dependency
import React, { Component } from 'react'
// Including the Link component from React Router to navigate within our application without full page reloads
// https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
import { Link } from "react-router";
import Jumbotron from './Jumbotron';
import Login from './Login';
import Navbar from './Navbar';

// Create the Main component
class Main extends Component {
  state = {
    isLoggedIn: false,
    user: {}
  }

  render() {

    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div className="main-container">
        <div className="container">

          <Navbar user={(this.state.isLoggedIn ? this.state.user : null)} />

          {/* Jumbotron
          <Jumbotron /> */}
          
          {/* Here we will deploy the sub components (Dashboard, Commands or Settings */}
          {/* These sub-components are getting passed as this.props.children */}
          {this.props.children}

          {/* <footer>
            <hr />
            <p className="pull-right">
              <i className="fa fa-github" aria-hidden="true"></i>
               Proudly built using MERN stack
            </p>
          </footer> */}
        </div>
      </div>
    );
  }
};

// Export the module back to the route
export default Main;