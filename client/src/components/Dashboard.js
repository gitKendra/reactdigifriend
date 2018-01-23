import React, { Component } from 'react';
import Chatbox from './Dashboard/Chatbox';
import Canvas from './Dashboard/canView';

class Dashboard extends Component {

	state = {
		showCommands: false,
		showChat: true
  }

  render() {
    
    var style = {
    float:'right',
    width:'500',
    height:'500'
  }

    return (
      <div className="container">
				<div style={style} id="canvasDiv">
          <Canvas />
        </div>
				
        {((this.props.botClient !== null) && <Chatbox channel={this.props.channel} botClient={this.props.botClient} /> )}

      </div>
        );
    };
}

export default Dashboard;