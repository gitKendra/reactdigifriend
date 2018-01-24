import React, {Component} from 'react'
import SocialButton from '../components/SocialButton'
import Navbar from '../components/Navbar/Navbar';
import Jumbotron from '../components/Jumbotron';
// import UserCard from '../components/UserCard'

// import helpers from '../utils/helpers';


class Login extends Component {

    render() {

        let children
        const isLoggedIn = this.props.state.logged;

    if (this.props.state.logged) {
      children = 
        <div>

          <div className="container text-center mt-5">

            <p>If this is your first time loggin in or you would like to update your settings, 
              please select the Settings link above to fill in your bot settings.</p>
            <p>If you have already setup your bot, click on the Dashboard link above.</p>
          </div>
        </div>
    } else {
      children = [
        <SocialButton
          provider='google'
          appId='1027655819933-nvb84kqldj02p6k5lheda9lm8vr1bkin.apps.googleusercontent.com'
          onLoginSuccess={this.props.fn.onLoginSuccess}
          onLoginFailure={this.props.fn.onLoginFailure}
          onLogoutSuccess={this.props.fn.onLogoutSuccess}
          onLogoutFailure={this.props.fn.onLogoutFailure}
          getInstance={this.props.fn.setNodeRef.bind(this, 'google')}
          key={'google'}
        >
          Login with Google
        </SocialButton>
      ]
    }

    return (
        <div>

        {isLoggedIn ? (
          <Jumbotron
            title={`Welcome, ${this.props.state.dbUser.username}!`}
            body="You are successfully logged in."
          /> 
        ):(
          <Jumbotron
            title="Login"
            body="Please login to use DigiFriend."
          />
        )
        }

          {children}

        </div>

    );
  }
}

export default Login;