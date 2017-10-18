import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import MainNav from "./MainNav";
import HomeView from "../views/HomeView";
import BlogView from "../views/BlogView";
import NewView from "../views/NewView";
import SignUpView from "../views/SignUpView";
import SignInView from "../views/SignInView";
import ProfileView from "../views/ProfileView";
import "../styles/App.css";

class App extends Component {
  state = {
    isAuthenticated: false,
    user: {}
  };

  _autheticateUser = userInfo => {
    this.setState({
      isAuthenticated: true,
      user: {
        username: userInfo.username,
        name: userInfo.name,
        avatar: userInfo.avatar,
        id: userInfo.id
      }
    });
  };

  _reauthUser = () => {
    const token = {
      token: window.localStorage.getItem("token")
    };
    if (token) {
      axios
        .post("https://the-ink-hhkohdvsan.now.shusers/reauth", token)
        .then(response => {
          response;
          window.localStorage.setItem("token", response.data.token);
          const userReauth = response.data.user;
          this.setState({
            isAuthenticated: true,
            user: {
              username: userReauth.username,
              name: userReauth.name,
              avatar: userReauth.avatar,
              id: userReauth.id
            }
          });
        });
    }
  };

  _signOut = () => {
    window.localStorage.removeItem("token");
    this.setState({
      isAuthenticated: false,
      user: {}
    });
  };

  componentDidMount() {
    this._reauthUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app col-4-4">
          <MainNav
            signOut={this._signOut}
            user={this.state.user}
            isAuthenticated={this.state.isAuthenticated}
          />

          <Switch>
            <Route exact path="/authors/:username" component={ProfileView} />
            <Route
              exact
              path="/blogs/:postId"
              component={props => (
                <BlogView
                  {...this.props}
                  {...props}
                  currentUser={this.state.user}
                />
              )}
            />
            <Route
              exact
              path="/login"
              component={() => (
                <SignInView
                  authenticate={this._autheticateUser}
                  isAuthenticated={this.state.isAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              component={() => (
                <SignUpView isAuthenticated={this.state.isAuthenticated} />
              )}
            />
            <Route
              exact
              path="/newblog"
              component={() => (
                <NewView isAuthenticated={this.state.isAuthenticated} />
              )}
            />
            <Route
              exact
              path="/"
              component={() => (
                <HomeView isAuthenticated={this.state.isAuthenticated} />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  state;
  // return {
  //   isAuthenticated: this.state.isAuthenticated
  // };
}
// this.props = {
//    //whatever mapStateToProps returns
// }

export default connect(mapStateToProps)(App);
