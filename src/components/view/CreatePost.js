import React, { Component } from 'react';
import DropZone from 'react-dropzone';
import sha1 from 'sha1';

import { APIManager } from '../../utils';

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      post: {
        image: '',
        caption: ''
      }
    };
  }

  updatePost(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.post);
    updated[event.target.id] = event.target.value;
    this.setState({
      post: updated
    });
  }

  submitPost(event) {
    event.preventDefault();

    if (this.state.post.image.length == 0) {
      alert('please add an image first');
      return;
    }

    if (this.state.post.caption.length == 0) {
      alert('please add a caption first');
      return;
    }

    let updated = Object.assign({}, this.state.post);
    this.props.onCreate(updated);
  }

  imageSelected(files) {
    const image = files[0];

    const cloudName = 'hyszj0vmt';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const apiSecret = '_lruNZ8yrruUqb9RDGYeVE23YcI';
    const uploadPreset = 'rhmvjoqw';
    const api_key = '427924639774458';
    const timestamp = Date.now() / 1000;
    const paramStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}${apiSecret}`;
    const signature = sha1(paramStr);
    const params = {
      file: image,
      api_key: api_key,
      timestamp: timestamp,
      upload_preset: uploadPreset,
      signature: signature
    };

    APIManager.upload(url, params, (err, progress) => {
      console.log(progress);
    })
      .then(uploaded => {
        let updated = Object.assign({}, this.state.post);
        updated['image'] = uploaded['secure_url'];
        this.setState({
          post: updated
        });
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="row" style={{ marginBottom: 20 }}>
        <div className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <h4>
                <strong>CreatePost</strong>
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={this.updatePost.bind(this)}
                type="text"
                id="caption"
                className="validate"
              />
              <label htmlFor="caption">Caption</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 l4">
              <DropZone
                onDrop={this.imageSelected.bind(this)}
                style={{ border: 'none' }}
              >
                <button className="waves-effect waves-light btn green">
                  Add Image
                </button>
              </DropZone>
            </div>
            <div className="input-field col s12 l4">
              <button
                onClick={this.submitPost.bind(this)}
                className="waves-effect btn"
              >
                Submit
              </button>
            </div>
            <div className="input-field col s2 offset-s2">
              <img
                style={{ width: 120, float: 'right' }}
                src={this.state.post.image}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
