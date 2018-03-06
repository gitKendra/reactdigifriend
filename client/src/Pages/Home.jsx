import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import screenshot from "../components/screenshot.PNG";

class Home extends Component {
  render() {
    const style = {
      h4: {
        color: "#512da8"
      }
    };

    return (
      <div>
        <Jumbotron
          title="Digital Friend & Bot"
          body="Custom commands and an interactive digital friend for Twitch streamers."
        />
        <div className="container">
          <div className="row d-flex">
            <div className="col d-flex">
              <div className="card mt-2">
                <div className="card-body">
                  <div className="text-center">
                    <h4 className="font-up" style={style.h4}>
                      About DigiFriend
                    </h4>
                    <hr />
                    <p>
                      DigiFriend is a digital friend and tool for those who
                      stream on Twitch to make their stream more interactive.
                    </p>
                    <p>
                      DigiFriend provides a way for viewers to interact with
                      your stream by listening to messages in chat and
                      responding to their message on video, through an overlay,
                      and in chat
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col d-flex">
              <div className="card mt-2">
                <div className="card-body">
                  <div className="text-center">
                    <h4 className="font-up" style={style.h4}>
                      DigiFriends
                    </h4>
                    <hr />
                    <p>
                      DigiFriend gives you the option of several different
                      digital friends, or digifriends, to use on stream. Each
                      digifriend has its own custom graphics and commands that
                      you can choose from.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col d-flex">
              <div className="card mt-2">
                <div className="card-body">
                  <div className="text-center">
                    <h4 className="font-up" style={style.h4}>
                      Custom Commands
                    </h4>
                    <hr />
                    <p>
                      DigiFriend allows you, the streamer, to create your own
                      custom commands or keywords and the response that the bot
                      will say in chat. Be as fun or creative as you like!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-lg-12">
              <div className="card mt-2">
                <div className="card-body">
                  <h4 className="font-up" style={style.h4}>
                    Twitch Screenshot
                  </h4>
                  <img
                    className="img-fluid mx-auto d-block mt-3"
                    alt="obs-screenshot"
                    src={screenshot}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
