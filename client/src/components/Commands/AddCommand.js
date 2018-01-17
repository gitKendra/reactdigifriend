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

  // Whenever we detect ANY change in the textbox, we register it.
  handleChange = (event) => {
    // Here we create syntax to capture any change in text to the AddCommand terms (pre-search).
    // See this Stack Overflow answer for more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
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

  // Here we render the AddCommand component
  render() {

    return (
      <div className="main-container">

        <div className="row">
          <div className="col-lg-12">

            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title" role="button" onClick={this.toggle}>
                {/* <a role="button" onClick={this.toggle}> */}
                  <strong>
                    <i className="fa fa-plus-square-o" aria-hidden="true"></i> Add a Command
                    <i className={"fa fa-chevron-"+ (this.state.collapse ? "down" : "up")+" pull-right"} aria-hidden="true"></i>
                  </strong>
                  {/* </a> */}
                </h1>
              </div>
              <div className={"collapse"+ (this.state.collapse ? "" : " in")}>
                <div className="panel-body">

                  {/* Note how we associate the text-box inputs with the state values */}
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <h4 className=""><strong>Command Name</strong></h4>
                      <input
                        type="text"
                        value={this.state.name}
                        className="form-control"
                        id="name"
                        onChange={this.handleChange}
                        placeholder="ex: !command"
                        required
                      />

                      <h4><strong>Command Message</strong></h4>
                      <input
                        type="text"
                        value={this.state.message}
                        className="form-control"
                        id="message"
                        onChange={this.handleChange}
                        placeholder="This is what the bot will say in chat if triggered by !command"
                        required
                      />

                    </div>

                    <div className="pull-right">
                      <button
                        type="submit"
                        className="btn btn-danger"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
};

// Export the module back to the route
export default AddCommand;