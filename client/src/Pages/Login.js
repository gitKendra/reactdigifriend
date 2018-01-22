import React, {Component} from 'react'
import SocialButton from '../components/SocialButton'
// import UserCard from '../components/UserCard'

// import helpers from '../utils/helpers';


class Login extends Component {

    render() {

        let children

    if (this.props.state.logged) {
      children = 
        <div className="container text-center mt-5">
          <h4><strong>Welcome, {this.props.state.dbUser.username}!</strong></h4>
          <h4>You have successfully logged in!</h4>
          <p>If this is your first time loggin in or you would like to update your settings, 
            please select the Settings link above to fill in your bot settings.</p>
          <p>If you have already setup your bot, click on the Dashboard link above.</p>
        </div>
      // children = <UserCard user={this.props.user} logout={this.props.fn.logout} />
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

            {children}

        </div>

    );
  }
}

export default Login;