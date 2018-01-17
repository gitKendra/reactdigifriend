import React, {Component} from 'react';
import { Link } from "react-router";

class Navbar extends Component {

    render() {
      return (

            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                    <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-ex1-collapse"
                    >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to={ (this.props.isLoggedIn ? "/dashboard" : "/") }>DigiFriend</Link>
                </div>

                <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <ul className="nav navbar-nav navbar-left">
                    {/* Using <Link> in place of <a> and "to" in place of "href" */}
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    </ul>
                </div>

              </div>
          </nav>
      );
    }
};

export default Navbar;