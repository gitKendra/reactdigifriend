import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Commands from '../components/Commands'
import Navbar from '../components/Navbar/Navbar';
import helpers from '../utils/helpers';
import tmi from "tmi.js";


class DashboardWrapper extends Component{

    state = {
        username: "",
        logo: "",
        id: "",
        channel: "",
        client: null,
        userCommands: [],
        spriteCommands: [],
        comBtnVisible: ""
    }

    componentDidMount() {
        console.log(this.props);
        // Don't do anything if user isn't logged in

        // Get user data from db to display customized dashboard
        // user id on KK laptop: 5a5a4271bd5601fb56ccffb7
        //user id on kk home: 5a58fde1b22f3594888cd306
        if(this.props.isLoggedIn){
            this.setState({ id: this.props.user._id, comBtnVisible: true }, () => {
                this.loadBotClient();
                this.getSpriteCommands();
                this.getUserCommands(); 
            })
        }
        
    }

    loadBotClient = () => {
        helpers.getUser(this.state.id)
        .then( (user) => {
           
            const botSettings = user.data.botSettings;

            this.setState({
                username: user.data.username,
                logo: user.data.logo,
                // id: user.data._id,
                channel: botSettings.channels[0]
            });

            // Create and setup bot
            var botClient = tmi.client({
                options: {debug: true},
                connection: {reconnect: true},
                identity: {username: botSettings.name, password: botSettings.oAuth},
                channels: botSettings.channels
            });

            // Connect to chat server
            botClient.connect().then(() => {
                botClient.join(this.state.channel);
              });
          
            this.setState({ botClient: botClient });

            // Allow the bot to listen to any messages in the chat
            botClient.on("chat", function (channel, userstate, message, self) {
                // Don't listen to messages from bot
                if(self) return;
        
                var msg = parseMessage(message);
                var response;
                switch(msg.command){
                    // Pet commands
                    case "!pet":
                        console.log("Pet command triggered");
                        response = performPetAction(channel, msg.action, userstate.username);
                        break;
                    case "!test":
                        console.log("Test message triggered");
                        response = "This is a test message."
                        break;
                    default:
                        console.log("No valid commands given");
                        break;
                }
                
                botClient.say(channel, `${userstate.username} ${response}`).then(function(data) {
                    // data returns [channel]
                }).catch(function(err) {
                    console.log(err);
                });
            });
            // Parse command key and action from chat message
            var parseMessage = (message) => {
            
                message = message.toLowerCase().split(" ");

                var parsedMessage = {
                    command: message[0],
                    action: message[1]
                }

                return parsedMessage;
            }

            var performPetAction = (channel, action, username) => {
                
                var chatMessage;

                if(action !== undefined) {
                    switch(action){
                        case "pet":
                            console.log(username + " pet the dog.");
                            chatMessage = "pet the dog."
                            break;
                        case "play":
                            console.log(username + " played with the dog.");
                            chatMessage = "played with the dog."
                            break;	
                        case "feed":
                            console.log(username + " fed the dog.");
                            chatMessage = "fed the dog."
                            break;					
                        case "treat":
                            console.log(username + " gave the dog a treat.");
                            chatMessage = "gave the dog a treat."
                            break;							
                    }
                }
                else {
                    console.log("Null action");
                    chatMessage = "No pet action taken";
                }

                return chatMessage;
            }
        });
    }

    // Retrieves the custom commands stored in the database for user
    getUserCommands = () => {
        console.log("GET user commands");
        helpers.getSaved(this.state.id)
        .then((commandData) => {
            this.setState({ userCommands: commandData.data });
            console.log("retrieved commands from db", commandData.data);
        });
    }

    // Retrieves sprite doc then sets state based on their commands
    getSpriteCommands = () => {
        helpers.getSprite(this.state.id).then((dbSprite) => {
            // set the sprite commands state
            console.log("retrieved Sprite doc", dbSprite);
        });
    }

    // These functions will be passed down into child components
    // Function to add a command to the database then update state
    addCommand = (newName, newMessage) => {
        helpers.postSaved(newName, newMessage, this.state.id)
        .then((data) => {
            this.getUserCommands();
        });
  }

    // Function to delete a command from the database then update state
    delCommand = (id) => {
        helpers.deleteSaved(id)
        .then( () => {
            this.getUserCommands();
        });
    }

    renderDashboard = () => {
        if(this.state.botClient !== null) {
            return(
                <div className="dashboard-container">
                    <Dashboard channel={this.state.channel} botClient={this.state.botClient}/>
                </div>
            )
        }
    }

    showComBtn = () => {
        this.setState({ comBtnVisible: true });
    }
    showDashBtn = () => {
        this.setState({ comBtnVisible: false })
    }

    renderNotLoggedIn = () => {
        return(
            <div >
                <h4 className="text-center">You must be logged in to access your settings.</h4>
            </div>
        )
      }

    render(){

        const {match} = this.props;
        // Only render the dashboard if user is logged in
        if(this.props.isLoggedIn){
            return(             
                <div>

                    { this.state.comBtnVisible ?
                    <button className="btn btn-success" onClick={this.showDashBtn}>
                        <Link to={`${match.url}/commands`}>List of commands</Link>
                    </button>
                    :
                    <button className="btn btn-success" onClick={this.showComBtn}>
                        <Link to={"/dashboard"}>Back to Dashboard</Link>
                    </button>               
                }
                    
                    {/* Add Subroute to current route*/}
                    <Route 
                        exact path={match.url} 
                        render={() => (
                            this.renderDashboard()
                        )}
                    />
                    <Route 
                        path={`${match.url}/commands`} 
                        render={ props => 
                            <Commands 
                                delCom={this.delCommand} 
                                addCom={this.addCommand} 
                                userCom={this.state.userCommands} 
                                {...props} 
                            />
                        }
                    />
                </div>
            );
        }
        // TODO Show message if not logged in
        return this.renderNotLoggedIn();

    }
}

export default DashboardWrapper;