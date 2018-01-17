import React, {Component} from 'react';


class Chatbox extends Component{
    // state = {
    //     bot: null
    // }
    componentDidMount(){
        console.log(this.props.botClient);
    //     const bot = this.props.botClient;

    // // Allow the bot to listen to any messages in the chat
    // bot.on("chat", function (channel, userstate, message, self) {
    //     // Don't listen to messages from bot
    //     if(self) return;

    //     var msg = parseMessage(message);
        
    //     switch(msg.command){
    //         // Pet commands
    //         case "!pet":
    //             console.log("Pet command triggered");
    //             performPetAction(channel, msg.action, userstate.username);
    //             break;
    //         case "!test":
    //             console.log("Test message triggered");
    //             bot.say(channel, "Your message").then(function(data) {
    //                 // data returns [channel]
    //             }).catch(function(err) {
    //                 //
    //                 console.log(err);
    //             });
    //             break;
    //         default:
    //             console.log("No valid commands given");
    //             break;
    //     }

    // });

    // var parseMessage = function(message){

    //     message = message.toLowerCase().split(" ");

    //     var parsedMessage = {
    //         command: message[0],
    //         action: message[1]
    //     }

    //     return parsedMessage;
    // }


    // var performPetAction = function(channel, action, username){
        
    //     var chatMessage;

    //     if(action !== undefined) {
    //         switch(action){
    //             case "pet":
    //                 console.log(username + " pet the dog.");
    //                 chatMessage = "pet the dog."
    //                 break;
    //             case "play":
    //                 console.log(username + " played with the dog.");
    //                 chatMessage = "played with the dog."
    //                 break;	
    //             case "feed":
    //                 console.log(username + " fed the dog.");
    //                 chatMessage = "fed the dog."
    //                 break;					
    //             case "treat":
    //                 console.log(username + " gave the dog a treat.");
    //                 chatMessage = "gave the dog a treat."
    //                 break;							
    //         }
    //     }
    //     else {
    //         console.log("Null action");
    //         chatMessage = "No pet action taken";
    //         // Inform user from chat
    //     }

    //     bot.say(channel, `${username} ${chatMessage}`);
    // }

    // this.setState({bot: bot});
}

    render() {
        return(
            <iframe title="Twitch Chat"
                scrolling="yes" 
                id="chat_embed" 
                src={`http://www.twitch.tv/embed/${this.props.channel}/chat`} 
                // src={`http://www.twitch.tv/embed/digiFriend/chat`} 
                height="500" 
                width="350">
            </iframe>
        );
    }

}

export default Chatbox;