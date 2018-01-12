import React, { Component } from 'react';
import Login from './Login';

import helpers from '../utils/helpers';
import Chatbox from './Dashboard/Chatbox';
import ToggleBot from './Dashboard/ToggleBot';

class Dashboard extends Component {

    state = {
        username: "",
        channel: "",
        logo: "",
        id: ""
    }

    componentDidMount() {
        // Get user data from db to display customized dashboard
        helpers.getUser("5a58fde1b22f3594888cd306")
        .then( (user) => {
            var channel = user.data.botSettings.channels[0].substring(1);
            this.setState({
                username: user.data.username,
                channel: channel,
                logo: user.data.logo,
                id: user.data._id
            });
        });
    }


    render() {

        return (
            <div className="row">
                <Login />

                <ToggleBot />

                {this.state.channel !== "" && 
                    <Chatbox channel={this.state.channel} />
                }

            </div>
        );
    };
}

export default Dashboard;