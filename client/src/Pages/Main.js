import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';

// Create the Main component
class Main extends Component {

  render() {

    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div className="main-container">
        <Navbar isLoggedIn={false}/>

        <Jumbotron />
        <Link to="/login">Login to use DigiFriend</Link>

      </div>
    );
  }
};

// Export the module back to the route
export default Main;