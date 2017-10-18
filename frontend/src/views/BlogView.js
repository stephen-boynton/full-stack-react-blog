import React, { Component } from "react";
import axios from "axios";
import BlogContent from "../components/BlogContent";
import "../styles/BlogView.css";

export default class BlogView extends Component {
  state = {
    post: {},
    comments: []
  };
  _retrievePostandComments = async () => {
    const { postId } = this.props.match.params;
    const thisPost = await axios
      .get("https://the-ink-fpxkusypdu.now.sh/users/user/" + postId)
      .then(post => {
        return post.data;
      });
    this.setState({
      post: thisPost.post,
      comments: thisPost.comments
    });
  };
  componentDidMount() {
    this._retrievePostandComments();
  }
  render() {
    return (
      <div className="BlogView">
        <BlogContent
          {...this.props}
          currentUser={this.props.currentUser}
          post={this.state.post}
          comments={this.state.comments}
        />
      </div>
    );
  }
}
