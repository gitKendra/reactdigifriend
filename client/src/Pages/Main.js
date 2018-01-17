import React, { Component } from 'react'
import Navbar from '../components/Navbar';

// Create the Main component
class Main extends Component {
  state = {
    isLoggedIn: true,
    user: {}
  }

  render() {

    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div className="main-container">
          {/* Render Navbar without user if not logged in */}
          {/* {(!this.state.isLoggedIn &&  */}
            <div>
              <Navbar isLoggedIn={this.state.isLoggedIn} />

            </div> 
          {/* )} */}
          {/* Jumbotron
          <Jumbotron /> */}
          
          {/* Here we will deploy the sub components (DashboardWrapper, Settings */}
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
    );
  }
};

// Export the module back to the route
export default Main;