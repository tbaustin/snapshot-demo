import React, { Component } from 'react';
import { connect } from 'react-redux';

import { APIManager } from '../../utils';
import actions from '../../actions';
import { CreatePost } from '../view';

class Posts extends Component {
  componentDidMount() {
    const currentLocation = this.props.posts.currentLocation;
    this.props.fetchPosts(currentLocation);
  }

  componentDidUpdate() {
    const { list } = this.props.posts;

    if (list === null && this.props.posts.moved == true) {
      const currentLocation = this.props.posts.currentLocation;
      this.props.fetchPosts(currentLocation);
    }
  }

  submitPost(post) {
    const user = this.props.account.user;
    if (user == null) {
      alert('Please sign up or login to submit');
      return;
    }
    post['profile'] = {
      id: user.id,
      username: user.username
    };

    const currentLocation = this.props.posts.currentLocation;

    post['geo'] = [currentLocation.lat, currentLocation.lng];

    this.props.createPost(post);
  }

  render() {
    const { list } = this.props.posts;

    return (
      <div>
        <CreatePost onCreate={this.submitPost.bind(this)} />

        {list == null ? null : list.length == 0 ? null : (
          <ul className="collection">
            {list.map(post => {
              return (
                <li className="collection-item avatar" key={post.id}>
                  <img src={post.image} className="circle" />
                  <span className="title" style={{ color: 'black' }}>
                    {post.caption}
                  </span>
                  <p>~ {post.profile.username}</p>
                  <a href="#!" className="secondary-content">
                    <i className="material-icons">question_answer</i>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    posts: state.post,
    account: state.account
  };
};

const dispatchToProps = dispatch => {
  return {
    fetchPosts: params => dispatch(actions.fetchPosts(params)),
    createPost: params => dispatch(actions.createPost(params))
  };
};

export default connect(stateToProps, dispatchToProps)(Posts);
