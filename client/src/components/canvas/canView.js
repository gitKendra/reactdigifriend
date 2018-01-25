import React, { Component, PropTypes } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image } from "react-konva";
import { Input } from 'react-bootstrap';
import canStyle from "../canvas/canStyle.css";

class IdleImage extends React.Component {
  
  state = {
    image: new window.Image()
  };
  
  // handleKeyPress(target) {
  //   if(target.charCode==13){
  //     setInterval((function() {
  //     // switch the image source
  //   })(), 5000)
  //     alert('Enter clicked!!!');    
  // }

  componentDidMount() {
    this.state.image.src = process.env.PUBLIC_URL +  "/images/idle2.png";
    this.state.image.src = process.env.PUBLIC_URL +  "/images/jump1.png";
    this.state.image.src = process.env.PUBLIC_URL +  "/images/jump2.png";
    this.state.image.src = process.env.PUBLIC_URL +  "/images/jump3.png";
    this.state.image.src = process.env.PUBLIC_URL +  "/images/jump4.png";
    this.state.image.onload = () => {     
    this.imageNode.getLayer().batchDraw();
    };
    setInterval((function() {
          // switch the image source
        })(), 5000)
    
  }
  

  render() {
    return (
      <Image
        image={this.state.image}
        y={50}
        x={50}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

class App extends Component {
  render() {
    return (
      <Stage width={475} height={475}>
        <Layer>
          <IdleImage />
        </Layer>
      </Stage>
    );
  }
}

export default App;
