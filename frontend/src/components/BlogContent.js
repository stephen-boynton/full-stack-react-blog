import React, { Component } from "react";
import axios from "axios";
import BlogComment from "./BlogComment";
import ExistingComment from "./ExistingComment";
import "../styles/BlogContent.css";

export default class BlogContent extends Component {
  state = {
    commentOpen: false
  };
  _leaveComment = () => {
    if (this.state.commentOpen) {
      return (
        <div className="fadeInUp">
          <BlogComment
            {...this.props}
            submit={this._handleCommentSubmission}
            close={this._handleClosingComment}
            currentUser={this.props.currentUser}
          />
        </div>
      );
    } else {
      return (
        <button className="btn" onClick={this._handleOpenComment}>
          Leave Comment
        </button>
      );
    }
  };
  _handleOpenComment = () => {
    this.setState({
      commentOpen: true
    });
  };
  _handleClosingComment = e => {
    e.preventDefault();
    this.setState({
      commentOpen: false
    });
  };

  _handleCommentSubmission = e => {
    e.preventDefault();
    e.persist();
    const { postId } = this.props.match.params;
    const token = window.localStorage.getItem("token");
    const comment = {
      title: e.target[0].value,
      comment: e.target[1].value,
      post_id: postId,
      token: token
    };
    axios
      .post("https://the-ink-xrzvapcmnw.now.sh/users/blogs/comment", comment)
      .then(response => {
        if (response.data) {
          e.target[0].value = "";
          e.target[1].value = "";
        } else {
          this.setState({
            errorMessage: "Something went wrong. Please try again later"
          });
        }
      });
  };

  render() {
    return (
      <div className="BlogContent col-3-4">
        <h2>{this.props.post.title}</h2>
        <img src={this.props.post.image} />
        <p>{this.props.post.body}</p>
        {this._leaveComment()}
        {this.props.comments.map(comment => {
          return <ExistingComment comment={comment} />;
        })}
      </div>
    );
  }
}
