import React, { Component } from "react";
import axios from "axios";
import NewBlogForm from "../components/NewBlogForm";
import BlogDisplay from "../components/BlogDisplay";
import "../styles/NewView.css";

export default class NewView extends Component {
  constructor() {
    super();
    this.state = {
      post: {}
    };
  }
  _handleSubmission = post => {
    axios
      .post("https://glacial-thicket-62880.herokuapp.com/users/newpost", post)
      .then(res => res);
  };

  _handlePreview = post => {
    this.setState = {
      post: {
        title: post.title,
        image: post.image,
        body: post.body,
        tags: post.tags
      }
    };
  };

  render() {
    return (
      <div className="NewView col-4-4">
        <NewBlogForm
          preview={this._handlePreview}
          submit={this._handleSubmission}
        />
        <BlogDisplay post={this.state.post} />
      </div>
    );
  }
}
