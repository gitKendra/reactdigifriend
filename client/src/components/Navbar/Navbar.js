import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {

    render() {
    
      return (
        
        <nav className="navbar navbar-expand-md navbar-dark indigo">
            <NavLink className="navbar-brand" to="/">DigiFriend</NavLink>

            <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/" className="navLink" activeClassName="active">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="navLink" activeClassName="active">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/settings" className="navLink" activeClassName="active">Settings</NavLink>
                    </li>
                </ul>
            </div>

            <div className="navbar-nav">
                <NavLink to="/login" className="navLink">
                    <span className="user-image"><i className="fa fa-user-circle-o" aria-hidden="true"></i></span>
                    Login
                </NavLink>
            </div>
        </nav>
      );
    }
};

export default Navbar;