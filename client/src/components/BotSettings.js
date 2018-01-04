// Include React as a dependency
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const title = (
  <h1>
    <i className='fa fa-cogs' aria-hidden='true'></i>  Bot Settings
  </h1>
);

// Query Component Declaration
class BotSettings extends Component {
  // Here we set initial variables for the component to be blanks
  state = { 
    name: "",
    oAuth: "",
    channel: "",
    isSubmitting: false,
    isSubmitted: false
  }

  // Whenever we detect ANY change in the textbox, we register it.
  handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.value
      });
  }


  // This code handles the sending of the search terms to the database
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit/Save button clicked");
    
    this.setState({ 
      channel: "#" + this.state.channel,
      isSubmitting: true,
      isSubmitted: false 
    });
    
    // POST data to database

    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({ 
        name: "",
        oAuth: "",
        channel: "",
        isSubmitting: false,
        isSubmitted: true
      });
    }, 2000);
  }

  render() {

    return (

        <Panel header={title} bsStyle="primary">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className=""><strong>Bot name:</strong></h4>
              <p>Twitch account to be used as the bot. Must be added as a mod in the channel.</p> 
              <input
                type="text"
                value={this.state.name}
                className="form-control"
                id="name"
                onChange={this.handleChange}
                required
              />

              <h4><strong>oAuth Token:</strong></h4>
              <p>Copy and paste the token from <a href="https://twitchapps.com/tmi/">Twitch Apps</a> including "oauth:")</p>
              <input
                type="text"
                value={this.state.oAuth}
                className="form-control"
                id="oAuth"
                onChange={this.handleChange}
                required
              />

              <h4><strong>Channel</strong></h4>
              <p>The Twitch channel that the the bot will be joining</p>

              <input
                type="text"
                value={this.state.channel}
                className="form-control"
                id="channel"
                onChange={this.handleChange}
                required
              />

            </div>

            {/* Here we create the onClick event that triggers the HandleSubmit */}
            <Button 
              bsStyle="danger" 
              type="submit"
              onClick={!this.state.isSubmitting ? this.handleSubmit : null}
            >
              {this.state.isSubmitting ? 'Saving...' : 'Save'}
            </ Button>
            <span>     </span>
            <Button  
              disabled={!this.state.isSubmitted}>
              Next
            </ Button>
          </form>
        </Panel>


      // <div className="main-container">

      //   <div className="row">
      //     <div className="col-lg-12">

      //       <div className="panel panel-primary">
      //         <div className="panel-heading">
      //           <h1 className="panel-title">
      //             <strong>
      //               <i className="fa fa-cogs" aria-hidden="true"></i>  Bot Settings
      //             </strong>
      //           </h1>
      //         </div>
      //         <div className="panel-body">

      //           {/* Note how we associate the text-box inputs with the state values */}
      //           <form onSubmit={this.handleSubmit}>
      //             <div className="form-group">
      //               <h4 className=""><strong>Bot name:</strong></h4>
      //               <input
      //                 type="text"
      //                 value={this.state.name}
      //                 className="form-control"
      //                 id="name"
      //                 onChange={this.handleChange}
      //                 required
      //               />

      //               <h4><strong>oAuth Token:</strong></h4>
      //               <p>(Copy and paste from <a href="https://twitchapps.com/tmi/">Twitch Apps</a> including "oauth:")</p>
      //               <input
      //                 type="text"
      //                 value={this.state.oAuth}
      //                 className="form-control"
      //                 id="oAuth"
      //                 onChange={this.handleChange}
      //                 required
      //               />

      //               <h4><strong>Channels</strong></h4>
      //               <p>(Use a comma to separate multiple channels)</p>

      //               <input
      //                 type="text"
      //                 value={this.state.channel}
      //                 className="form-control"
      //                 id="channel"
      //                 onChange={this.handleChange}
      //                 required
      //               />

      //             </div>

      //             {/* Here we create the onClick event that triggers the HandleSubmit */}
      //             <div className="pull-right">
      //               <button
      //                 type="submit"
      //                 className="btn btn-danger"
      //               >
      //                 <h4>Save</h4>
      //               </button>
      //             </div>
      //           </form>

      //         </div>
      //       </div>

      //     </div>
      //   </div>
      // </div>
    );
  }
};

// Export the module back to the route
export default BotSettings;