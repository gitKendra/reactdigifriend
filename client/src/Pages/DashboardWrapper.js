import React, { Component } from 'react';
import { Link } from 'react-router';
import Dashboard from '../components/Dashboard';
import Commands from '../components/Commands'

import helpers from '../utils/helpers';
import tmi from "tmi.js";
import Navbar from '../components/Navbar';

class DashboardWrapper extends Component{

    state = {
        username: "",
        logo: "",
        id: "",
        channel: "",
        client: null
    }

    componentDidMount() {
        // Get user data from db to display customized dashboard
        // user id on KK laptop: 5a5a4271bd5601fb56ccffb7
        //user id on kk home: 5a58fde1b22f3594888cd306
        helpers.getUser("5a5a4271bd5601fb56ccffb7")
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
    }


    render(){



        return(

            <div className="dashboard-container">
            {((this.state.client !== null) && <Dashboard channel={this.state.channel} botClient={this.state.client}/>)}
            {/* <Route path="/dashboard/commands" component={Commands} /> */}

            </div>
        );

    }
}

export default DashboardWrapper;