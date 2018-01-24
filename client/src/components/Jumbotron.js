// Include React as a dependency
import React, { Component } from 'react'

class Jumbotron extends Component{

   
  render() {
    
    return (
      <div className="container">
      <div className="jumbotron mt-3">
        <h2 className="text-center font-up"><strong>{this.props.title}</strong></h2>
        <h4 className="text-center">{this.props.body}</h4>
      </div>
    </div>
    )
  }
};

export default Jumbotron;