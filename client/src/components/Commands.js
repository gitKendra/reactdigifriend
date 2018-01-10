// Include React as a dependency
import React, { Component } from 'react'

// Include the AddCommand and Saved components
import AddCommand from "./Commands/AddCommand";
import Saved from "./Commands/Saved";

// Include the helpers for making API calls
import helpers from "../utils/helpers";

// Create the Commands component
class Commands extends Component {

  state = { 
    dbCommands: []
  }

  componentDidMount(){
    this.getCommands();
  }

  // Function to retrieve the commands stored in the database
  getCommands = () => {
    helpers.getSaved()
    .then((commandData) => {
      this.setState({ dbCommands: commandData.data });
      console.log("retrieved commands from db", commandData.data);
    })
  }

  // These functions will be passed down into child components
  // Function to add a command to the database then update state
  addCommand = (newName, newMessage, userId) => {
    helpers.postSaved(newName, newMessage, userId)
    .then((data) => {
      this.getCommands();
    });
  }

  // Function to delete a command from the database then update state
  delCommand = (id) => {
    helpers.deleteSaved(id)
    .then( () => {
      this.getCommands();
    });
  }

  // Render the component
  render() {
    return (
      <div className="main-container">

        {/* Pass the addCommand function to enable AddCommand function in child  */}
        <AddCommand addCom={this.addCommand} />
        {/* Pass the delCommand function and commands from database to enable its use in child  */}
        <Saved delCom={this.delCommand} comArray={this.state.dbCommands} />

      </div>
    );
  }
};

// Export the module back to the route
export default Commands;