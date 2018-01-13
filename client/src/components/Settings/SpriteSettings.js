import React, {Component} from 'react';

// // Include the helpers for making API calls
// import helpers from "../../utils/helpers";

class SpriteSettings extends Component {

    // state to store selection
    state = {
        result: [] // stores an array of sprites available from the database
    }

    // on component mount, pull sprites from server that user may select
    componentDidMount() {
        // pull sprites from database

        // render sprites on screen
    };

    render() {
        return(
            <div className="main-container">

            <div className="row">
              <div className="col-lg-12">
    
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h1 className="panel-title">
                      <strong>
                        <i className="fa fa-paw" aria-hidden="true"></i>  Sprite Settings
                      </strong>
                    </h1>
                  </div>
                  <div className="panel-body">
    
                    {/* Note how we associate the text-box inputs with the state values */}
                    <form onSubmit={!this.state.isSubmitting ? this.handleSubmit : null}>
                      <div className="form-group">
                        <h4 className=""><strong>Bot name:</strong></h4>
                        <input
                          type="text"
                          value={this.state.name}
                          className="form-control"
                          id="name"
                          onChange={this.handleChange}
                          required
                        />
    
                        <h4><strong>oAuth Token:</strong></h4>
                        <p>(Copy and paste from <a href="https://twitchapps.com/tmi/">Twitch Apps</a> including "oauth:")</p>
                        <input
                          type="text"
                          value={this.state.oAuth}
                          className="form-control"
                          id="oAuth"
                          onChange={this.handleChange}
                          required
                        />
    
                        <h4><strong>Channels</strong></h4>
                        <p>(Use a comma to separate multiple channels)</p>
    
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
                      <div className="pull-right">
                        <button 
                          type="submit" 
                          className="btn btn-danger"
                        //   onClick={!this.state.isSubmitting ? this.handleSubmit : null}
                        >
                            {this.state.isSubmitting ? 'Saving...' : 'Save'}
                          {/* <h4>Save</h4> */}
                        </button>
                      </div>
                    </form>
    
                  </div>
                </div>
    
              </div>
            </div>
          </div>
        )
    }

}

export default SpriteSettings;