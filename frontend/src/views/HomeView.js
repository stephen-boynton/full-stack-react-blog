import React, { Component } from "react";
import axios from "axios";
import LatestBlog from "../components/LatestBlog";
import FeaturedBlog from "../components/FeaturedBlog";
import FeaturedComments from "../components/FeaturedComments";
import SmallBlog from "../components/SmallBlog";
import "../styles/HomeView.css";

export default class MainView extends Component {
  constructor() {
    super();
    this.state = {
      latest: [],
      featured: [],
      smallBlogs: [1, 2, 3, 4],
      featuredComments: [1, 2, 3]
    };
  }

  _fetchFrontPageContent = () => {
    axios.get("https://the-ink-fpxkusypdu.now.sh/homeview").then(content => {
      const data = content.data;
      this.setState({
        latest: data.last[0],
        featured: data.featuredArt[0],
        smallBlogs: data.recent,
        featuredComments: data.featuredCom
      });
    });
  };

  _truncateText = blogBody => {
    if (blogBody) {
      const truncatedPost = blogBody.substring(0, 250);
      return truncatedPost + "...";
    }
  };

  componentDidMount() {
    this._fetchFrontPageContent();
  }

  render() {
    return (
      <div className="HomeView container">
        <FeaturedBlog
          truncate={this._truncateText}
          post={this.state.featured}
        />
        <div className="row">
          <LatestBlog truncate={this._truncateText} post={this.state.latest} />
          <FeaturedComments comments={this.state.featuredComments} />
        </div>
        <div className="row">
          {this.state.smallBlogs.map((blog, ind) => {
            return (
              <SmallBlog
                truncate={this._truncateText}
                post={blog}
                key={blog.post_id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
