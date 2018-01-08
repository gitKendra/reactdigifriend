//This is the Login page that the user will see when first going to the page. They have to click on the login button which will redirect them to Bot setup.

import React from 'react';
import { Link } from 'react-router';
import '../BotSetting.js';

export default class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            location: "",


        }
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick() {
        window.location.replace("/login")

    }

    render(){

        return (
          <div>
              <div className="row">
                <div className="col-md-12">
                    <div className="header">
                        <img alt="digFriend" className="digiFriend" src={require('../../../public/assets/digiImg.png')}/>
                        <p className="intro"> Welcome to Digifriend </p>
                        <p className="intro"> An interactive twitch stream application!
                        </p>
                        <p className="intro2"> To get started, login with your Twitch or Google credentials below. </p>
                        <button className="btn btn-primary loginBtn" onClick={()=>this.handleClick()}><a href="/auth/twitch"><img src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png">Log in with Twitch or Google.</a>
                        </button>
                    </div>
                </div>
              </div>

          </div>


        );
    }

}