// Include React as a dependency
import React, { Component } from 'react';
import BotSettings from '../components/Settings/BotSettings';
import SpriteSettings from '../components/Settings/SpriteSettings';
import Navbar from '../components/Navbar';
// import { Panel } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';

// const title = (
//   <h1>
//     <i className='fa fa-cogs' aria-hidden='true'></i>  Settings
//   </h1>
// );

// Query Component Declaration
class Settings extends Component {
 
  render() {

    return (
        <div>
          <Navbar isLoggedIn={true}/>
            <BotSettings />
            <SpriteSettings />
        </div>
    );
  }
};

// Export the module back to the route
export default Settings;