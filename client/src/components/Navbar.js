import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    state = {
        isLoggedIn: true
    }

    componentDidMount(){
        if(!this.props){
            this.setState({isLoggedIn: this.props.isLoggedIn})
        }
    }

    renderNavLinks = () => {

        if(this.state.isLoggedIn){
            return(
                <ul className="nav navbar-nav navbar-left">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            );
        }
        else{
            return(
                <ul className="nav navbar-nav navbar-left">
                    <li><Link to="/login">Login</Link></li>
                </ul>                
            )
        }
    }

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
                    {this.renderNavLinks()}
                </div>

              </div>
          </nav>
      );
    }
};

export default Navbar;