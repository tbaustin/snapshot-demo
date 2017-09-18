import axios from 'axios';
import Promise from 'bluebird';

export default {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(response => {
          if (response.data.confirmation != 'success') {
            throw new Error(response.data.message);
            return;
          }
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  post: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(response => {
          if (response.data.confirmation != 'success') {
            throw new Error(response.data.message);
            return;
          }
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  upload: (endpoint, params, callback) => {
    return new Promise((resolve, reject) => {
      let fd = new FormData();

      if (params != null) {
        Object.keys(params).forEach(key => {
          fd.append(key, params[key]);
        });
      }

      const config = {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        onUploadProgress: progressEvent => {
          const progress = Math.round(
            progressEvent.loaded * 100.0 / progressEvent.total
          );
          callback(null, progress);
        }
      };
      axios
        .post(endpoint, fd, config)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
