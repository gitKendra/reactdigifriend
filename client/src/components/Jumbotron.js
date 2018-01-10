// Include React as a dependency
import React, { Component } from 'react'

class Jumbotron extends Component{
    
  render() {

    return (
      <div className="jumbotron">
        <h2 className="text-center"><strong>Digital Friend & Bot</strong></h2>
        <h3 className="text-center">Custom commands and an interactive digital friend for Twitch streamers.</h3>
      </div>
    )
  }
};

export default Jumbotron;