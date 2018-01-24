import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Commands from '../components/Commands'
import helpers from '../utils/helpers';
import tmi from "tmi.js";


class DashboardWrapper extends Component{

    state = {
        id: "",
        channel: "",
        userCommands: [],
        spriteCommands: [],
        comBtnVisible: ""
    }

    componentDidMount() {
        console.log(this.props);
        // Don't do anything if user isn't logged in

        // Get user data from db to display customized dashboard
        this.setState({ id: this.props.user._id, comBtnVisible: true }, () => {
            console.log("Set dbw state with id", this.state.id);

            if(this.props.isLoggedIn && this.props.user.botSettings !== undefined){
            
                // get user saved commands and update state
                helpers.getSaved(this.props.user._id)
                .then((commandData) => {

                    this.setState({ userCommands: commandData.data }, () => {
                        console.log("set dbw state with user commands", this.state.userCommands);
                        // then get sprite commands and update state
                        helpers.getSprite(this.props.user.sprite_id)
                        .then((dbSprite) => {
                            this.setState({ spriteCommands: dbSprite.data.commands}, () =>{
                                console.log("set dbw state with sprite commands", this.state.spriteCommands);
                                this.loadBotClient()
                            });
                        });
                    });
                });
            }
        })
    }

    loadBotClient = () => {
        console.log("Loading BotClient");
        const userCommands = this.state.userCommands;
        const spriteCommands = this.state.spriteCommands;

        // Create and setup bot
        var botClient = tmi.client({
            options: {debug: true},
            connection: {reconnect: true},
            identity: {
                username: this.props.user.botSettings.name, 
                password: this.props.user.botSettings.oAuth},
                channels: this.props.user.botSettings.channels
        });

        // Connect to chat server
        botClient.connect().then((data) => {
            botClient.join(this.state.channel)  
        });
        
        this.setState({ botClient: botClient });

        // Allow the bot to listen to any messages in the chat
        botClient.on("chat", function (channel, userstate, message, self) {
            // Don't listen to messages from bot
            if(self) return;

            // Check if message is a command
            if(message[0] === '!'){

                var msg = parseMessage(message);
                var response;

                //Check if it's a sprite command
                if(msg.command.substring(0,5) === '!digi'){
                    // Check if sprite command
                    for(let i=0; i<spriteCommands.length; i++){
                        console.log(msg.command.substring(5));
                        if(spriteCommands[i].name === msg.command.substring(5)){
                            response = "/me " + spriteCommands[i].message;
                            // TODO: CALL ACTION ON CANVAS

                            break;
                        }
                    }
                }
                else{
                    // Check if it's a user custom command
                    for(let i=0; i<userCommands.length; i++){
                        if(userCommands[i].name === msg.command){
                            response = userCommands[i].message;
                            break;
                        }
                    }
                }

            }

            if(response === undefined){
                return;
            }
            else{
                botClient.say(channel, response).then(function(data) {
                // botClient.say(channel, `${userstate.username} ${response}`).then(function(data) {
                    // data returns [channel]
                }).catch(function(err) {
                    console.log(err);
                });
            }
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
    }

    // Retrieves the custom commands stored in the database for user
    getUserCommands = () => {
        console.log("GET user commands");
        helpers.getSaved(this.props.user._id)
        .then((commandData) => {
            this.setState({ userCommands: commandData.data });
            console.log("retrieved commands from db", commandData.data);
        });
    }

    // Retrieves sprite doc then sets state based on their commands
    getSpriteCommands = () => {
        helpers.getSprite(this.props.user.sprite_id).then((dbSprite) => {
            // set the sprite commands state
            console.log("retrieved Sprite doc", dbSprite);
            this.setState({ spriteCommands: dbSprite.data.commands});
        });
    }

    // These functions will be passed down into child components
    // Function to add a command to the database then update state
    addCommand = (newName, newMessage) => {
        helpers.postSaved(newName, newMessage, this.props.user._id)
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

    showComBtn = () => {
        this.setState({ comBtnVisible: true });
    }
    showDashBtn = () => {
        this.setState({ comBtnVisible: false })
    }

    renderDashboard = () => {
       
        return(
            <div className="dashboard-container">
                <Dashboard channel={this.props.user.botSettings.channels[0].substring(1)} botClient={this.state.botClient}/>
            </div>
        )

    }

    renderNotLoggedIn = () => {
        return(
            <div >
                <h4 className="text-center">You must be logged in to access your settings.</h4>
            </div>
        )
    }

    renderNoSettings = () => {
        return(
            <div >
                <h4 className="text-center mt-5">Update your settings first!</h4>
            </div>
        )    }


    render(){

        const {match} = this.props;
        // Only render the dashboard if user is logged in
        if(this.props.isLoggedIn){

            if(this.props.user.botSettings === undefined){
                return this.renderNoSettings();
            }

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