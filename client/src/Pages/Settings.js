// Include React as a dependency
import React, { Component } from 'react';
import BotSettings from '../components/Settings/BotSettings';
import SpriteSettings from '../components/Settings/SpriteSettings';
import Navbar from '../components/Navbar/Navbar';

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