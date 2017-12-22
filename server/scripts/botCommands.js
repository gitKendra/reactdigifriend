var bot = require('./bot.js');

var petKey = "pet";


// Allow the bot to listen to any messages in the chat
bot.on("chat", function (channel, userstate, message, self) {
	// Don't listen to messages from bot
	if(self) return;

	var msg = parseMessage(message);
	
	switch(msg.command){
		// Pet commands
		case "!" + petKey:
			console.log("Pet command triggered");
			performPetAction(channel, msg.action, userstate.username);
			break;
		case "!test":
			console.log("Test message triggered");
			break;
		default:
			console.log("No valid commands given");
			break;
	}

});

var parseMessage = function(message){

	message = message.toLowerCase().split(" ");

	var parsedMessage = {
		command: message[0],
		action: message[1]
	}

	return parsedMessage;
}


var performPetAction = function(channel, action, username){
	
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
		// Inform user from chat
	}

	bot.say(channel, `${username} ${chatMessage}`);
}