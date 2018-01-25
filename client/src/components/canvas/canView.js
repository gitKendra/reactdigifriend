import React, { Component, PropTypes } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image } from "react-konva";
import { Input } from 'react-bootstrap';
import canStyle from "../canvas/canStyle.css";
import jump from "../canvas/jump.js";

class IdleImage extends React.Component {
  
  state = {
    image: new window.Image()
  };

  componentDidMount() {
    this.state.image.src = process.env.PUBLIC_URL +  "/images/idle2.png";
    this.state.image.onload = () => {     
    this.imageNode.getLayer().batchDraw();
    };
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

// class JumpImage extends React.Component {
  
//   state = {
//     image: new window.Image()
//   };

//   componentDidMount() {
//     this.state.image.src = process.env.PUBLIC_URL +  "/images/jump1.png";
//     this.state.image.onload = () => {     
//     this.imageNode.getLayer().batchDraw();
//     };
//   }

//   render() {
//     return (
//       <Image
//         image={this.state.image}
//         y={60}
//         x={50}
//         ref={node => {
//           this.imageNode = node;
//         }}
//       />
//     );
//   }
// }


// class JumpTwoImage extends React.Component {
  
//   state = {
//     image: new window.Image()
//   };

//   componentDidMount() {
//     this.state.image.src = process.env.PUBLIC_URL +  "/images/jump2.png";
//     this.state.image.onload = () => {     
//     this.imageNode.getLayer().batchDraw();
//     };
//   }

//   render() {
//     return (
//       <Image
//         image={this.state.image}
//         y={10}
//         x={50}
//         ref={node => {
//           this.imageNode = node;
//         }}
//       />
//     );
//   }
// }

// class JumpThreeImage extends React.Component {
  
//   state = {
//     image: new window.Image()
//   };

//   componentDidMount() {
//     this.state.image.src = process.env.PUBLIC_URL +  "/images/jump3.png";
//     this.state.image.onload = () => {     
//     this.imageNode.getLayer().batchDraw();
//     };
//   }

//   render() {
//     return (
//       <Image
//         image={this.state.image}
//         y={0}
//         x={50}
//         ref={node => {
//           this.imageNode = node;
//         }}
//       />
//     );
//   }
// }

// class JumpFourImage extends React.Component {
  
//   state = {
//     image: new window.Image()
//   };

//   componentDidMount() {
//     this.state.image.src = process.env.PUBLIC_URL +  "/images/jump4.png";
//     this.state.image.onload = () => {     
//     this.imageNode.getLayer().batchDraw();
//     };
//   }

//   render() {
//     return (
//       <Image
//         image={this.state.image}
//         y={110}
//         x={50}
//         ref={node => {
//           this.imageNode = node;
//         }}
//       />
//     );
//   }
// }

class CanView extends Component {
  render() {
    return (
      <Stage width={500} height={500}>
        <Layer>
          <IdleImage />
          {/* <JumpImage />
          <JumpTwoImage />
          <JumpThreeImage />
          <JumpFourImage /> */}
        </Layer>
      </Stage>
    );
  }
}

export default CanView;
