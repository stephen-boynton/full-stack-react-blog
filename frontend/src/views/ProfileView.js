import React, { Component } from "react";
import SinglePost from "../components/SinglePost";
import axios from "axios";
import ProfileIndividual from "../components/ProfileIndividual";
import "../styles/ProfileView.css";

export default class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      profile: {
        username: "",
        name: "",
        bio: "",
        id: "",
        avatar: ""
      },
      posts: []
    };
  }
  _getUserandPosts = async () => {
    const { username } = this.props.match.params;
    const thisProfile = await axios
      .get("https://the-ink-hhkohdvsan.now.sh/users/" + username)
      .then(user => {
        return user.data;
      });
    const thesePosts = await axios
      .get("/users/posts/" + thisProfile.id)
      .then(posts => {
        return posts.data;
      });
    this.setState({
      profile: thisProfile,
      posts: thesePosts
    });
  };

  componentDidMount() {
    this._getUserandPosts();
  }

  render() {
    return (
      <div className="ProfileView">
        <ProfileIndividual profile={this.state.profile} />
        <div className="ProfileBlogRow col-3-4">
          {this.state.posts.map(post => {
            return <SinglePost key={post.post_id} post={post} />;
          })}
        </div>
      </div>
    );
  }
}
