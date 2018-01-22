import React, { Component } from 'react';
import Chatbox from './Dashboard/Chatbox';
import Commands from './Commands';

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

        {/* <Link to={`/dashboard/commands`} className="btn btn-primary">View/Add Commands</Link>
        <Route path="/dashboard/commands" component={Commands} /> */}
      </div>
        );
    };
}

export default Dashboard;