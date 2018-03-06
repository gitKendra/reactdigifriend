import React, { Component } from "react";
import { Link } from "react-router-dom";
import SocialButton from "../components/SocialButton";
import Jumbotron from "../components/Jumbotron";

class Login extends Component {
  render() {
    let children;
    const isLoggedIn = this.props.state.logged;

    if (this.props.state.logged) {
      children = (
        <div>
          <div className="container text-center mt-5">
            <div className="card mt-4">
              <div className="card-body">
                <p>
                  If this is your first time logging into DigiFriend, go to{" "}
                  <Link to="/settings">Settings</Link> to setup your bot.
                </p>
                <p>
                  If you have already setup your bot, visit your{" "}
                  <Link to="/dashboard">Dashboard</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      children = (
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="card mt-4" style={{ width: "300px" }}>
              <div className="card-body">
                <p>Login with:</p>
                <SocialButton
                  provider="google"
                  appId="1027655819933-nvb84kqldj02p6k5lheda9lm8vr1bkin.apps.googleusercontent.com"
                  onLoginSuccess={this.props.fn.onLoginSuccess}
                  onLoginFailure={this.props.fn.onLoginFailure}
                  onLogoutSuccess={this.props.fn.onLogoutSuccess}
                  onLogoutFailure={this.props.fn.onLogoutFailure}
                  getInstance={this.props.fn.setNodeRef.bind(this, "google")}
                  key={"google"}
                >
                  Login with Google
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {isLoggedIn ? (
          <Jumbotron
            title={`Welcome, ${this.props.state.dbUser.username}!`}
            body="You are successfully logged in."
          />
        ) : (
          <Jumbotron
            title="Login to DigiFriend"
            body="Please login to use DigiFriend."
          />
        )}

        {children}
      </div>
    );
  }
}

export default Login;
