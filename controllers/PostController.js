var Post = require('../models/Post');
var Promise = require('bluebird');

module.exports = {
  get: (params, isRaw) => {
    return new Promise((resolve, reject) => {
      // check the parmas for the lat and lng
      if (params.lat != null && params.lng != null) {
        // geo spatial query:
        const range = 100 / 6371;
        params['geo'] = {
          $near: [params.lat, params.lng],
          $maxDistance: range
        };

        delete params['lat'];
        delete params['lng'];
      }

      const filters = {
        sort: {
          timestamp: -1
        }
      };

      Post.find(params, null, filters, (err, posts) => {
        if (err) {
          reject(err);
          return;
        }

        if (isRaw) {
          resolve(posts);
        } else {
          let list = [];
          posts.forEach(post => {
            list.push(post.summary());
          });
          resolve(list);
        }
      });
    });
  },

  getById: (id, isRaw) => {
    return new Promise((resolve, reject) => {
      Post.findById(id, (err, post) => {
        if (err) {
          reject(err);
          return;
        }

        if (isRaw) {
          resolve(post);
        } else {
          resolve(post.summary());
        }
      });
    });
  },

  post: (params, isRaw) => {
    return new Promise((resolve, reject) => {
      Post.create(params, (err, post) => {
        if (err) {
          reject(err);
          return;
        }
        if (isRaw) {
          resolve(post);
        } else {
          resolve(post.summary());
        }
      });
    });
  }
};
