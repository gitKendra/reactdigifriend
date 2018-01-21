import React, {Component} from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Navbar from "../components/Navbar/Navbar"

import SocialButton from '../components/SocialButton'
import UserCard from '../components/UserCard'

import helpers from '../utils/helpers';


class Login extends Component {

    state = {
        logged: false,
        user: {},
        currentProvider: ''
      }
    
      nodes = {}
  
      setNodeRef = (provider, node) => {
        if (node) {
          this.nodes[ provider ] = node
        }
      }
    
      onLoginSuccess = (user) => {
        console.log(user)
    
        this.setState({
          logged: true,
          currentProvider: user._provider,
          user
        })

        // TODO: Save user to DB
        helpers.postUser(user).then((data) => console.log(data));

        // redirect to Dashboard
      }
    
      onLoginFailure = (err) => {
        console.error(err)
    
        this.setState({
          logged: false,
          currentProvider: '',
          user: {}
        })
      }
    
      onLogoutSuccess = () => {
        this.setState({
          logged: false,
          currentProvider: '',
          user: {}
        })
      }
    
      onLogoutFailure = (err) => {
        console.error(err)
      }
    
      logout = () => {
        const { logged, currentProvider } = this.state
    
        if (logged && currentProvider) {
          this.nodes[currentProvider].props.triggerLogout()
        }
      }


    render() {

        let children

    if (this.state.logged) {
      children = <UserCard user={this.state.user} logout={this.logout} />
    } else {
      children = [
        <SocialButton
        provider='google'
        appId='1027655819933-nvb84kqldj02p6k5lheda9lm8vr1bkin.apps.googleusercontent.com'
        onLoginSuccess={this.onLoginSuccess}
        onLoginFailure={this.onLoginFailure}
        onLogoutSuccess={this.onLogoutSuccess}
        onLogoutFailure={this.onLogoutFailure}
        getInstance={this.setNodeRef.bind(this, 'google')}
        key={'google'}
      >
        Login with Google
      </SocialButton>
      ]
    }

    return (
        <div>
            <Navbar user={this.state.user !== null && this.state.user._profile} logout={this.logout} />

            {children}

        </div>

    );
  }
}

export default Login;