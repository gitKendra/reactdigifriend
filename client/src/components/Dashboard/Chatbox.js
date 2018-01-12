import React, {Component} from 'react';


class Chatbox extends Component{
    render() {
        return(
            <iframe title="Twitch Chat"
                scrolling="yes" 
                id="chat_embed" 
                src={`http://www.twitch.tv/embed/${this.props.channel}/chat`} 
                height="500" 
                width="350">
            </iframe>
        );
    }

}

export default Chatbox;