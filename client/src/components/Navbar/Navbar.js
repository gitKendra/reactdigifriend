import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {

    state = {
        avatar: 'https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png',
        name: ''
    }
    
    componentDidMount(){
        console.log(this.props);
        if(this.props.user !== undefined && this.props.user.profilePicURL === undefined){
            this.setState({
                avatar: this.props.user.profilePicURL,
                name: this.props.user.name
            })
        }
        else if(this.props.user !== undefined && this.props.user.name !== undefined){
            this.setState({
                name: this.props.name
            })
        }
    }

    renderLog = () => {
        if(this.props.user === undefined) {
            return(
                <NavLink to="/login" className="navLink mt-2 ml-2">              
                    Login
                </NavLink>
            )}
        else{
            return(
                <div className="navLink mt-2 ml-2" onClick={this.props.logout}>Logout</div>
            )
        }
    }

    
    render() {
    
        const styles = {
            avatar: {
                background: '#eceff1',
                boxShadow: '0 0 12px rgba(0,0,0,0.5)',
                border: '3px solid #fff',
                borderRadius: '50%',
                height: '2.7em',
                width: '2.7em',
                zIndex: '1'
              }
        }
        
      return (
        
        <nav className="navbar navbar-expand-md navbar-dark deep-purple darken-2">
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
                <img style={styles.avatar} alt="avatar" src={this.props.user === undefined ? this.state.avatar : this.props.user.profilePicURL} />
                {this.renderLog()}

            </div>
        </nav>
      );
    }
};

export default Navbar;