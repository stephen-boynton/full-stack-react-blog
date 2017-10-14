import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import HomeView from "../views/HomeView";
import BlogView from "../views/BlogView";
import NewView from "../views/NewView";
import SignUpView from "../views/SignUpView";
import SignInView from "../views/SignInView";
import ProfileView from "../views/ProfileView";
import "../styles/App.css";

class App extends Component {
  state = {
    loggedIn: false,
    user: {}
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app col-4-4">
          <Switch>
            <Route exact path="/login" component={SignInView} />
            <Route exact path="/signup" component={SignUpView} />
            <Route exact path="/newblog" component={NewView} />
            <Route exact path="/" component={HomeView} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    posts: state.posts
  };
}
// this.props = {
//    //whatever mapStateToProps returns
// }

export default connect(mapStateToProps)(App);
