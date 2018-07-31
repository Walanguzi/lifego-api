const { comment } = require('./types');
const {
  createCommentArgs,
  updateCommentArgs,
  deleteCommentArgs,
} = require('./arguments');
const {
  deleteComment,
  updateComment,
  createComment,
} = require('../../lib/resolvers/comments');
const { successMessage } = require('../Common/types');

module.exports = {
  createComment: {
    type: comment,
    args: createCommentArgs,
    resolve: createComment,
  },
  updateComment: {
    type: comment,
    args: updateCommentArgs,
    resolve: updateComment,
  },
  deleteComment: {
    type: successMessage,
    args: deleteCommentArgs,
    resolve: deleteComment,
  },
};
