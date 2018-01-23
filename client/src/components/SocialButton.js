import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SocialLogin from 'react-social-login'
import gbtn from './btn_google.png'

class Button extends Component {
    static propTypes = {
      triggerLogin: PropTypes.func.isRequired,
      triggerLogout: PropTypes.func.isRequired
    }
  
    render () {
      const { children, triggerLogin, triggerLogout, ...props } = this.props

      return (
          <img className="mx-auto d-block" src={gbtn} alt="Google Sign in" onClick={triggerLogin}  {...props}/>

      )
    }
  }
  
  export default SocialLogin(Button)