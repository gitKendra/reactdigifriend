// Include React as a dependency
import React, { Component } from 'react'

// AddCommand Component Declaration
class AddCommand extends Component {
  // Here we set initial variables for the component to be blanks
  state = { 
    name: "",
    message: "",
    collapse: true
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  handleChange = (event) => {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  // This code handles the sending of the search terms to the parent Commands component
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addCom(this.state.name, this.state.message);
    this.setState({ name: "", message: "" });
  }

  renderForm = () => {
    return(
   
      <div className="card mt-4">
        <div className="card-body">

          <div className="text-center">
            <h4 className="font-up mb-0">Add Command</h4>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="md-form">
                <input 
                  type="text"
                  value={this.state.name}
                  className="form-control"
                  id="name"
                  onChange={this.handleChange}
                  placeholder="Command name"
                  required
                />
            </div>

            <div className="md-form">
              <input 
                type="text"
                value={this.state.message}
                className="form-control"
                id="message"
                onChange={this.handleChange}
                placeholder="Command message"
                required
              />
            </div>

            <div className="text-center pull-right">
                <button className="btn btn-deep-orange">Save</button>
            </div>
          </form>
        </div>
      </div>

    )
  }

  // Here we render the AddCommand component
  render() {

    return (

        this.renderForm()

    );
  }
};

// Export the module back to the route
export default AddCommand;