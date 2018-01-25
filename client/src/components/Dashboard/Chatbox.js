import React, {Component} from 'react';


class Chatbox extends Component{

    render() {
        return(
            <div className="card mt-4">
                <div className="card-body">

                    <iframe title="Twitch Chat"
                        scrolling="yes" 
                        id="chat_embed" 
                        src={`https://www.twitch.tv/embed/${this.props.channel}/chat`} 
                        height="500" 
                        width="350">
                    </iframe>
                </div>
            </div>
        );
    }

}

export default Chatbox;