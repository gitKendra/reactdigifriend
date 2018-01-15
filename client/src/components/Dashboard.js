import React, { Component } from 'react';
import Login from './Login';

import helpers from '../utils/helpers';
import Chatbox from './Dashboard/Chatbox';
import ToggleBot from './Dashboard/ToggleBot';
import tmi from "tmi.js";

class Dashboard extends Component {

    state = {
        username: "",
<<<<<<< HEAD
=======
        channel: "digifriend",
>>>>>>> 06c2dc9213d275d69de1b832d8bff6c01365a485
        logo: "",
        id: "",
        channel: "",
        client: null
    }

    componentDidMount() {
<<<<<<< HEAD
        // Get user data from db to display customized dashboard
        helpers.getUser("5a58fde1b22f3594888cd306")
        .then( (user) => {
            // var channel = user.data.botSettings.channels[0].substring(1);
            const botSettings = user.data.botSettings;

            this.setState({
                username: user.data.username,
                logo: user.data.logo,
                id: user.data._id,
                channel: botSettings.channels[0].substring(1)
            });

            // Create and setup bot
            var client = tmi.client({
                options: {debug: true},
                connection: {reconnect: true},
                identity: {username: botSettings.name, password: botSettings.oAuth},
                channels: botSettings.channels
            });

            // Connect to chat server
            client.connect().then(data => {
                console.log(`Connected to ${data[0]} on port ${data[1]}`);
                // Join chat server
                client.join(this.state.channel).then(channel => {
                  console.log(`joined ${channel} channel`);
                });
              });
          
            this.setState({ client: client });
        });
=======
        // // Get user data from db to display customized dashboard
        // helpers.getUser("5a5a4271bd5601fb56ccffb7")
        // .then( (user) => {
        //     var channel = user.data.botSettings.channels[0].substring(1);
        //     this.setState({
        //         username: user.data.username,
        //         channel: channel,
        //         logo: user.data.logo,
        //         id: user.data._id
        //     });
        // });
>>>>>>> 06c2dc9213d275d69de1b832d8bff6c01365a485
    }


    render() {

        return (
            <div className="row">
                <Login />

                <ToggleBot />

                {this.state.client !== null && 
                    <Chatbox channel={this.state.channel} botClient={this.state.client} />
                }



            </div>
        );
    };
}

export default Dashboard;