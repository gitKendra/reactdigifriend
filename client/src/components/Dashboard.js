import React, { Component } from 'react';
import Chatbox from './Dashboard/Chatbox';


class Dashboard extends Component {

	state = {
		showCommands: false,
		showChat: true
	}

  render() {
    return (
      <div className="container">
				{/* INSERT CANVAS */}
				
        {((this.props.botClient !== null) && <Chatbox channel={this.props.channel} botClient={this.props.botClient} /> )}

      </div>
        );
    };
}

export default Dashboard;