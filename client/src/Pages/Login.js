import React, {Component} from 'react'
import Navbar from "../components/Navbar/Navbar"
import helpers from '../utils/helpers';


class Login extends Component {

    handleLogin() {
        helpers.twitchLogin();
    }

    render() {

        return(
            <div>
                <Navbar isLoggedIn={false}/>
                <h1>Login using Twitch</h1>
                <img alt="Twitch Login" onClick={this.handleLogin} src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png"/>
            </div>
        );
    };

}

export default Login;