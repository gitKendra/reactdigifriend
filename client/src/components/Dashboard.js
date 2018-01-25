import React, { Component } from 'react';
import Chatbox from './Dashboard/Chatbox';
// import Canvas from './canvas/canView';
// import index from '../public/index';

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
      <div className="container"  style={{width:'420px'}}>

				
        {((this.props.botClient !== null) && <Chatbox channel={this.props.channel} botClient={this.props.botClient} /> )}

      </div>
        );
    };
}

export default Dashboard;