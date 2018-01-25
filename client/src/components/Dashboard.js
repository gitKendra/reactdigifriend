import React, { Component } from 'react';
import Chatbox from './Dashboard/Chatbox';
import Canvas from './canvas/canView';

class Dashboard extends Component {

	state = {
		showCommands: false,
		showChat: true
  }

  render() {
    
    var styleCan = {
    float:'right',
    width:'475',
    height:'475'
  }

    return (
      <div className="container">
				<div style={styleCan} id="canvasDiv">
          <Canvas />
        </div>
				
        {((this.props.botClient !== null) && <Chatbox channel={this.props.channel} botClient={this.props.botClient} /> )}

      </div>
        );
    };
}

export default Dashboard;