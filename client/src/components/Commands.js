import React, { Component } from "react";
import AddCommand from "./Commands/AddCommand";
import Saved from "./Commands/Saved";
import "./Commands/Commands.css";

// Create the Commands component
class Commands extends Component {
  // Render the component
  render() {
    return (
      <div className="cmd-container">
        {/* <div className="row"> */}
          <div className="col-sm-12">
            <AddCommand addCom={this.props.addCom} />
          </div>
          <div className="col-sm-12">
            <Saved delCom={this.props.delCom} comArray={this.props.userCom} />
          </div>
        {/* </div> */}
      </div>
    );
  }
}

// Export the module back to the route
export default Commands;
