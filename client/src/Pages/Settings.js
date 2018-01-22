// Include React as a dependency
import React, { Component } from 'react';
import BotSettings from '../components/Settings/BotSettings';
import SpriteSettings from '../components/Settings/SpriteSettings';
import '../components/Settings/Settings.css';
import helpers from '../utils/helpers';

// Query Component Declaration
class Settings extends Component {
  // Here we set initial variables for the component to be blanks
  state = { 
    name: "",
    oAuth: "",
    channel: "",
    isSubmitting: false,
    isSubmitted: false,
    sprite: [],
    selectedSprite: ""
  }

  componentDidMount(){
    // Don't do anything if user isn't logged in
    if(this.props.isLoggedIn){
      // pull the user info from database
      // fill in name, oAuth, and channel with values from db if they exist

      // pull sprite info from databse
      this.getSprites();
    }
  }

  getSprites = () => {
    helpers.getAllSprites()
    .then((sprite) => {
      console.log("retrieved sprite info", sprite.data)
      this.setState({ sprite: sprite.data });
    })
  }

  // Whenever we detect ANY change in the textbox, we register it.
  handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.value
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit/Save button clicked");
    console.log(this.props.user._id);
    this.setState({ 
      channel: this.state.channel,
      isSubmitting: true,
      isSubmitted: false 
    });

    const botSettings = {
      name: this.state.name,
      oAuth: this.state.oAuth,
      channels: this.state.channel
    }
    
    // TODO: REPLACE STRING WITH PROP ID
    helpers.updateSettings(this.props.user._id, this.input.value, botSettings)
    .then((data) => {
      console.log("settings updated", data);
      this.setState({ 
        name: "",
        oAuth: "",
        channel: "",
        isSubmitting: false,
        isSubmitted: true
      });
      //TODO: Show notification popup that settings have been saved
      alert("Settings saved!");
    })

    // // then
    // setTimeout(() => {
    //   // Completed of async action, set loading state back
    //   this.setState({ 
    //     name: "",
    //     oAuth: "",
    //     channel: "",
    //     isSubmitting: false,
    //     isSubmitted: true
    //   });
    // }, 2000);
  }

  renderContainer = () => {

    return(
      <div className="settings-container">
        <div className="card mt-4">
          <div className="card-body">

            <div className="text-center">
              <h4 className="font-up mb-0">Bot Settings</h4>
            </div>

            <form onSubmit={!this.state.isSubmitting ? this.handleSubmit : null}>
              <div className="md-form">
                <h4 className=""><strong>Bot name:</strong></h4>
                <input 
                  type="text"
                  value={this.state.name}
                  className="form-control"
                  id="name"
                  onChange={this.handleChange}
                  placeholder="Twitch account that will be used as the bot"
                  required
                />
              </div>

              <div className="md-form">
                <h4><strong>oAuth Token:</strong></h4>
                <p>(Copy and paste from <a href="https://twitchapps.com/tmi/" target="_blank">Twitch Apps</a> using the account you entered for bot name, including "oauth:")</p>
                <input 
                  type="text"
                  value={this.state.oAuth}
                  className="form-control"
                  id="oAuth"
                  onChange={this.handleChange}
                  placeholder="ex: oauth:kskd9fksabek2cxof029dkszalj3hujk3"
                  required
                />
              </div>

              <div className="md-form">
                <h4><strong>Channel</strong></h4>
                <input 
                  type="text"
                  value={this.state.channel}
                  className="form-control"
                  id="channel"
                  onChange={this.handleChange}
                  placeholder="Twitch channel name which the bot will connect to and communicate with your viewers"
                  required
                />
              </div>

              {/* Sprites */}
              <div className="container md-form">
                <div className="spriteList row">
                  {this.renderSprites()}
                </div>
              </div>

              <div className="text-center pull-right">
                  <button className="btn btn-deep-orange">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  renderSprites = () => {

    return this.state.sprite.map((sprite, index) => {

      return (
        <div className="form-group" key={index}>
          <div className="item col">
            <div className="card pt-3 spriteCard">
            
              <img className="spriteImg" src={sprite.img} alt={sprite.name} />
              
              <div>
                <label className="spriteLabel" htmlFor={`sprite-${sprite.id}`}>
                  <input type="radio" ref={(input) => this.input = input} value={sprite.id} id={`sprite-${sprite.id}`} />
                </label>
              </div>

              <div className="card-body">
                <div className="text-center">
                  {sprite.name}
                </div>
              </div>

            </div>
          </div>
        </div>
      )
    });
  }

  renderNotLoggedIn = () => {
    return(
        <div >
            <h4 className="text-center">You must be logged in to access your settings.</h4>
        </div>
    )
  }
 
  render() {

    if (!this.state.sprite){
      return <p>Loading sprites....</p>
    }
    else if(this.props.isLoggedIn) {
      return this.renderContainer();
    }
    // TODO Show message if not logged in
    return this.renderNotLoggedIn();

  }
};

// Export the module back to the route
export default Settings;