// Include React as a dependency
import React, { Component } from 'react'

// Include the Helper (for the saved recall)
import helpers from "../../utils/helpers"

// Create the Main component
class Saved extends Component {

  handleDelete = (cmd) => {
    console.log("delete command id: "+cmd._id);
    this.props.delCom(cmd._id);
  }

  // A helper method for rendering the HTML when we have no saved commands
  renderEmpty = () => {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>Save your first Command...</em>
          </span>
        </h3>
      </li>
    );
  }

  // A helper method for mapping through our articles and outputting some HTML
  renderCommands = () => {
    // return this.state.savedCommands.map((article, index) => {
    return this.props.comArray.map((command, index) => {

      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{command.name}</em>
              </span>
              <span className="btn-group pull-right">
                {/* <button className="btn btn-default" onClick={() => this.handleEdit(article)}>Edit Command</button> */}
                <button className="btn btn-primary" onClick={() => this.handleDelete(command)}>Delete</button>
              </span>
            </h3>
            <p>Output: {command.message}</p>
          </li>
        </div>
      );
    });
  }

  // A helper method for rendering a container and all of our artiles inside
  renderContainer = () => {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-floppy-o" aria-hidden="true"></i> Saved Commands</strong>
                </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderCommands()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render() {
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.props.comArray) {
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
};

// Export the module back to the route
export default Saved;
