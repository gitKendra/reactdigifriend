// Include React as a dependency
import React, { Component } from 'react'
// Including the Link component from React Router to navigate within our application without full page reloads
// https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
import { Link } from "react-router";
import Jumbotron from './Jumbotron';
import Login from './Login';

// Create the Main component
class Main extends Component {

  render() {

    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div className="main-container">
        <div className="container">
          {/* Navbar */}
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-ex1-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">DigiFriend</Link>
              </div>

              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav navbar-left">
                  {/* Using <Link> in place of <a> and "to" in place of "href" */}
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/commands">Commands</Link></li>
                  <li><Link to="/settings">Settings</Link></li>
                </ul>
              </div>

            </div>
          </nav>

          {/* Jumbotron */}
          <Jumbotron />
          
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