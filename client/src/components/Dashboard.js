import React, { Component } from 'react';
import Chatbox from './Dashboard/Chatbox';
import jump from './canvas/jump';
import Commands from './Commands';
import hair from './images/hair.png';
import head from './images/head.png';
import leftArm from './images/leftArm.png';
import rightArm from './images/rightArm.png';
import leftArm_jump from './images/leftArm-jump.png';
import rightArm_jump from './images/rightArm-jump.png';
import legs from './images/legs.png';
import legsJump from './images/legs-jump.png';
import torso from './images/torso.png';



class Dashboard extends Component {

	state = {
		showCommands: false,
		showChat: true
  }

  render() {

    var style = {
      float:'right',
      width:'500px',
      height:'500px'

      }

    return (
      <div  className="container">

				<div style={style} id="canvasDiv"></div>
				
        {((this.props.botClient !== null) && <Chatbox channel={this.props.channel} botClient={this.props.botClient} /> )}

        {/* <Link to={`/dashboard/commands`} className="btn btn-primary">View/Add Commands</Link>
        <Route path="/dashboard/commands" component={Commands} /> */}
      </div>
        );
    };
}

export default Dashboard;