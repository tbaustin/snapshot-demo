var ProfileController = require('./ProfileController');
var CommentController = require('./CommentController');
var PostController = require('./PostController');

module.exports = {
  profile: ProfileController,
  post: PostController,
  comment: CommentController
};
