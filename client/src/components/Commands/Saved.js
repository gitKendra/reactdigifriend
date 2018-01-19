// Include React as a dependency
import React, { Component } from 'react'

// Create the Main component
class Saved extends Component {

  handleDelete = (cmd) => {
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

      return this.props.comArray.map((command, index) => {

      return(

        <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{command.name}</td>
            <td>{command.message}</td>
            <td>
              <span>
                <button 
                  className="btn btn-danger btn-rounded btn-sm del-com" 
                  onClick={() => this.handleDelete(command)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </span>
            </td>
        </tr>
      );
    });

  }

  // A helper method for rendering a container and all of our commands inside
  renderContainer = () => {
    return(
      
      <div className="col-12">
      <div className="card card-cascade mt-4">

        {/* <!--Card image--> */}
        <div className="view py-4 mx-4 mb-3 d-flex justify-content-center align-items-center">

            <h4 className="font-bold font-up mb-0">Custom Commands</h4>

        </div>
        {/* <!--/Card image--> */}

        <div className="px-4">

            {/* <!--Table--> */}
            <table className="table table-responseive mb-0">

                {/* <!--Table head--> */}
                <thead>
                    <tr>
                        <th scope="row">#</th>
                        <th scope="col" className="th-lg">Command</th>
                        <th scope="col" className="th-lg col-5">Message</th>
                        <th scope="col" className="th-lg">Delete</th>
                    </tr>
                </thead>
                {/* <!--/Table head--> */}

                {/* <!--/Table body--> */}
                <tbody>
                  {this.renderCommands()}
                </tbody>
            </table>
            {/* <!--/Table--> */}

        </div>
    </div>
    </div>
    )
  }
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render() {
    // If we have no commands, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.props.comArray) {
      return this.renderEmpty();
    }
    // If we have commands, return this.renderContainer() which in turn returns all saved commands
    return this.renderContainer();
  }
};

// Export the module back to the route
export default Saved;
