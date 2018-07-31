const { comment } = require('../types');
const {
  createCommentArgs,
  updateCommentArgs,
  deleteCommentArgs,
} = require('../arguments');
const commentResolvers = require('../../../lib/resolvers/comments');
const { successMessage } = require('../../Common/types');

const {
  createComment,
  updateComment,
  deleteComment,
} = require('../mutations');

describe('Comment mutation tests', () => {
  test('createComment mutation', () => {
    expect(createComment).toHaveProperty('type');
    expect(createComment.type).toEqual(comment);

    expect(createComment).toHaveProperty('args');
    expect(createComment.args).toEqual(createCommentArgs);

    expect(createComment).toHaveProperty('resolve');
    expect(createComment.resolve).toEqual(commentResolvers.createComment);
  });

  test('deleteComment mutation', () => {
    expect(deleteComment).toHaveProperty('type');
    expect(deleteComment.type).toEqual(successMessage);

    expect(deleteComment).toHaveProperty('args');
    expect(deleteComment.args).toEqual(deleteCommentArgs);

    expect(deleteComment).toHaveProperty('resolve');
    expect(deleteComment.resolve).toEqual(commentResolvers.deleteComment);
  });

  test('updateComment mutation', () => {
    expect(updateComment).toHaveProperty('type');
    expect(updateComment.type).toEqual(comment);

    expect(updateComment).toHaveProperty('args');
    expect(updateComment.args).toEqual(updateCommentArgs);

    expect(updateComment).toHaveProperty('resolve');
    expect(updateComment.resolve).toEqual(commentResolvers.updateComment);
  });
});
