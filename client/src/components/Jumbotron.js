// Include React as a dependency
import React, { Component } from 'react'

class Jumbotron extends Component{

   
  render() {
    
    return (

      <div className="jumbotron">
        <h2 className="text-center font-up"><strong>{this.props.title}</strong></h2>
        <h4 className="text-center">{this.props.body}</h4>
      </div>

    )
  }
};

export default Jumbotron;