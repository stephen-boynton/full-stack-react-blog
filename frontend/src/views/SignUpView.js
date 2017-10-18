import React, { Component } from "react";
import axios from "axios";
import SignUpForm from "../components/SignUpForm";
import "../styles/SignUpView.css";

export default class SignUpView extends Component {
  state = {
    errorMessage: "",
    success: false
  };
  _handleSignUp = e => {
    e.preventDefault();
    e.persist();
    const newMember = {
      name: e.target[0].value,
      email: e.target[1].value,
      username: e.target[2].value,
      pass: e.target[3].value,
      avatar: e.target[5].value,
      bio: e.target[6].value
    };
    axios
      .post("https://the-ink-hhkohdvsan.now.sh/users/signup", newMember)
      .then(response => {
        if (!response.data) {
          this.setState({
            errorMessage: "* Username already exists. *"
          });
          return;
        } else {
          e.target[0].value = "";
          e.target[1].value = "";
          e.target[2].value = "";
          e.target[3].value = "";
          e.target[4].value = "";
          e.target[5].value = "";
          e.target[6].value = "";
          this.setState({
            errorMessage: "",
            success: true
          });
        }
      });
  };
  _showForm() {
    if (this.state.success) {
      return <h2 className="SignUpForm">Account created, please log in</h2>;
    } else {
      return (
        <SignUpForm
          error={this.state.errorMessage}
          submit={this._handleSignUp}
        />
      );
    }
  }
  render() {
    return <div className="SignUpView col-4-4">{this._showForm()}</div>;
  }
}
