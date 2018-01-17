import React, {Component} from 'react'
// import { Link } from 'react-router'

import helpers from '../utils/helpers';


class Login extends Component {

    handleLogin() {
        helpers.twitchLogin();
    }

    render() {

        return(
            <div>
                <h1>Login using Twitch</h1>
                <img alt="Twitch Login" onClick={this.handleLogin} src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png"/>
            </div>
        );
    };

}

export default Login;