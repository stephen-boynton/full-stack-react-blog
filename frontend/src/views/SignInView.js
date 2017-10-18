import React, { Component } from "react";
import axios from "axios";
import SignInForm from "../components/SignInForm";
import "../styles/SignInView.css";

export default class SignInView extends Component {
  //ERROR:  This component rerenders so that it will not display the successful login correctly
  state = {
    errorMessage: "",
    success: false
  };
  _handleLogIn = e => {
    e.preventDefault();
    e.persist();
    const login = {
      username: e.target[0].value,
      pass: e.target[1].value
    };
    axios
      .post("https://the-ink-fpxkusypdu.now.sh/users/signin", login)
      .then(response => {
        if (response.data) {
          this.setState({
            errorMessage: "",
            success: true
          });
          window.localStorage.setItem("token", response.data.token);
          this.props.authenticate(response.data.user);
        } else if (response.data === false) {
          this.setState({
            errorMessage: "Invalid username or password"
          });
        }
      });
  };

  _successLogin = () => {
    if (this.state.success) {
      return <h1 className="SignUpForm">You have been logged in.</h1>;
    } else if (!this.state.success) {
      return (
        <SignInForm
          error={this.state.errorMessage}
          submit={this._handleLogIn}
        />
      );
    }
  };
  render() {
    return <div className="SignInView">{this._successLogin()}</div>;
  }
}
