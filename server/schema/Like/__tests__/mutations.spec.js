const { like: Like } = require('../types');
const {
  likeArgs,
  unlikeArgs,
} = require('../arguments');
const likeResolvers = require('../../../lib/resolvers/likes');
const { successMessage } = require('../../Common/types');

const {
  like,
  unlike,
} = require('../mutations');

describe('Like mutation tests', () => {
  test('like mutation', () => {
    expect(like).toHaveProperty('type');
    expect(like.type).toEqual(Like);

    expect(like).toHaveProperty('args');
    expect(like.args).toEqual(likeArgs);

    expect(like).toHaveProperty('resolve');
    expect(like.resolve).toEqual(likeResolvers.like);
  });

  test('unlike mutation', () => {
    expect(unlike).toHaveProperty('type');
    expect(unlike.type).toEqual(successMessage);

    expect(unlike).toHaveProperty('args');
    expect(unlike.args).toEqual(unlikeArgs);

    expect(unlike).toHaveProperty('resolve');
    expect(unlike.resolve).toEqual(likeResolvers.unlike);
  });
});
