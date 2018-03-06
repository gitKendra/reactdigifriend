// Include React as a dependency
import React, { Component } from "react";
import "../components/Settings/Settings.css";
import helpers from "../utils/helpers";
import Jumbotron from "../components/Jumbotron";

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
    selectedSprite: "1"
  };

  componentDidMount() {
    // Don't do anything if user isn't logged in
    if (this.props.isLoggedIn) {
      // pull the user info from database
      // fill in name, oAuth, and channel with values from db if they exist

      // pull sprite info from databse
      this.getSprites();
    }
  }

  handleOptionChange = event => {
    this.setState({ selectedSprite: event.target.value });
  };

  getSprites = () => {
    helpers.getAllSprites().then(sprite => {
      console.log("retrieved sprite info", sprite.data);
      this.setState({ sprite: sprite.data });
    });
  };

  // Whenever we detect ANY change in the textbox, we register it.
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      channel: this.state.channel,
      isSubmitting: true,
      isSubmitted: false
    });

    const botSettings = {
      name: this.state.name,
      oAuth: this.state.oAuth,
      channels: "#" + this.state.channel
    };

    helpers
      .updateSettings(
        this.props.user._id,
        this.state.selectedSprite,
        botSettings
      )
      .then(data => {
        console.log("settings updated", data);

        // update Main with new info from database
        this.props.getUser();

        this.setState({
          name: "",
          oAuth: "",
          channel: "",
          isSubmitting: false,
          isSubmitted: true
        });
        alert("Settings saved!");
      });
  };

  renderContainer = () => {
    return (
      <div className="settings-container mb-4">
        <form onSubmit={!this.state.isSubmitting ? this.handleSubmit : null}>
          <div className="card mt-4">
            <div className="card-body">
              <div className="text-center">
                <h4 className="font-up" style={{ color: "#512da8" }}>
                  Bot Settings
                </h4>
              </div>
              <hr
                style={{
                  height: "12px",
                  border: "0",
                  boxShadow: "inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)"
                }}
              />

              <div className="md-form">
                <h4 className="">
                  <strong>Bot name:</strong>
                </h4>
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
                <h4>
                  <strong>oAuth Token:</strong>
                </h4>
                <p>
                  (Copy and paste from{" "}
                  <a
                    href="https://twitchapps.com/tmi/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitch Apps
                  </a>{" "}
                  using the account you entered for bot name)
                </p>
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
                <h4>
                  <strong>Channel</strong>
                </h4>
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
            </div>
          </div>

          {/* Sprites */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="text-center mt-2">
                <h4 className="font-up" style={{ color: "#512da8" }}>
                  Choose a DigiFriend
                </h4>
              </div>
              <hr
                style={{
                  height: "12px",
                  border: "0",
                  boxShadow: "inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)"
                }}
              />

              <div className="container md-form">
                <div className="spriteList row justify-content-md-center">
                  {this.renderSprites()}
                </div>
              </div>

              <div className="text-center pull-right">
                <button className="btn btn-deep-orange">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  renderSprites = () => {
    return this.state.sprite.map((sprite, index) => {
      return (
        <div className="form-group" key={index}>
          <div className="item col">
            <div className="card pt-3 spriteCard">
              <img className="spriteImg" src={sprite.img} alt={sprite.name} />

              <div>
                <label className="spriteLabel" htmlFor={`sprite-${sprite.sid}`}>
                  <input
                    type="radio"
                    value={sprite.id}
                    id={`sprite-${sprite.sid}`}
                    checked={this.state.selectedSprite === sprite.sid}
                    onChange={this.handleOptionChange}
                  />
                </label>
              </div>

              <div className="card-body">
                <div className="text-center">{sprite.name}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  renderNotLoggedIn = () => {
    return (
      <div>
        <p className="text-center">
          You must be logged in to access your settings.
        </p>
      </div>
    );
  };

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <div>
        <Jumbotron
          title="Settings"
          body="Setup your bot and choose your digiFriend."
        />

        <div className="container">
          {isLoggedIn ? this.renderContainer() : this.renderNotLoggedIn()}
        </div>
      </div>
    );
  }
}

// Export the module back to the route
export default Settings;
