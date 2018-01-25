import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Commands from '../components/Commands'
import Jumbotron from '../components/Jumbotron';
import helpers from '../utils/helpers';
import tmi from 'tmijs-es5';
import jump from '../components/canvas/canView';

class DashboardWrapper extends Component{

    state = {
        id: "",
        channel: "",
        userCommands: [],
        spriteCommands: [],
        comBtnVisible: "",
        botClient:""
    }

    componentDidMount() {

        // Get user data from db to display customized dashboard
        this.setState({ id: this.props.user._id, comBtnVisible: true , botClient:"notSet"}, () => {
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

    componentWillUnmount() {
        if(this.state.botClient !== "notSet"){
            this.state.botClient.disconnect();
        }
    }
    loadBotClient = () => {
        console.log("Loading BotClient");
        const userCommands = this.state.userCommands;
        const spriteCommands = this.state.spriteCommands;

         // Disconnect current botClient, if exists, before loading a new instance
         if(this.state.botClient !== "notSet"){
            this.state.botClient.disconnect().then(function(data) {
                console.log("DISCONNECT CLIENT FROM SERVER");
            });
        }
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

                    for(let i=0; i<spriteCommands.length; i++){
                        if(spriteCommands[i].name === msg.command.substring(5)){
                            response = "/me " + spriteCommands[i].message;
                            // TODO: CALL ACTION ON CANVAS
                            window.jumpy();

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
                botClient.say(channel, response);
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
    // Reloads bot to keep it up-to-date with most current db pull
    getUserCommands = () => {

        helpers.getSaved(this.props.user._id)
        .then((commandData) => {
            this.setState({ userCommands: commandData.data }, () => {
                this.loadBotClient();
            });
        });
    }

    // Retrieves sprite doc then sets state sprite commands
    getSpriteCommands = () => {
        helpers.getSprite(this.props.user.sprite_id).then((dbSprite) => {
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

    // Update button according to which route/subroute user is currently on
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
                <Jumbotron
                    title="Dashboard"
                    body="The place to view your chat, digiFriend, and view/add custom commands."
                />
                <p className="text-center">You must be logged in to access your dashboard.</p>
            </div>
        )
    }

    renderNoSettings = () => {
        return(
            <div >
                <Jumbotron
                    title="Dashboard"
                    body="The place to view your chat, digiFriend, and view/add custom commands."
                />                
                <p className="text-center mt-5">Update your settings first!</p>
            </div>
        )    
    }

    render(){

        const {match} = this.props;
        const viewCombtn = this.state.comBtnVisible;
        
        // Only render the dashboard if user is logged in
        if(this.props.isLoggedIn){

            if(this.props.user.botSettings === undefined){
                return this.renderNoSettings();
            }

            return(             
                <div>
                    <Jumbotron
                        title="Dashboard"
                        body="The place to view your chat, digiFriend, and view/add custom commands."
                    />

                    <div className="container">
                        { viewCombtn ?
                        <button className="btn btn-success" onClick={this.showDashBtn}>
                            <Link className="link" to={`${match.url}/commands`}>List of commands</Link>
                        </button>
                        :
                        <button className="btn btn-success" onClick={this.showComBtn}>
                            <Link className="link" to={"/dashboard"}>Back to Dashboard</Link>
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
                </div>
            );
        }
        // TODO Show message if not logged in
        return this.renderNotLoggedIn();

    }
}

export default DashboardWrapper;