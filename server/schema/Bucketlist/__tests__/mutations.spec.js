const {
  bucketlist,
  bucketlists,
} = require('../types');
const {
  createBucketlistArgs,
  updateBucketlistArgs,
  getBucketlistArgs,
  deleteBucketlistArgs,
  listArgs,
} = require('../arguments');
const bucketlistResolvers = require('../../../lib/resolvers/bucketlists');
const { successMessage } = require('../../Common/types');

const {
  createBucketlist,
  getBucketlist,
  updateBucketlist,
  list,
  listAll,
  explore,
  deleteBucketlist,
} = require('../mutations');

describe('Bucketlist mutation tests', () => {
  test('createBucketlist mutation', () => {
    expect(createBucketlist).toHaveProperty('type');
    expect(createBucketlist.type).toEqual(bucketlist);

    expect(createBucketlist).toHaveProperty('args');
    expect(createBucketlist.args).toEqual(createBucketlistArgs);

    expect(createBucketlist).toHaveProperty('resolve');
    expect(createBucketlist.resolve).toEqual(bucketlistResolvers.createBucketlist);
  });

  test('getBucketlist mutation', () => {
    expect(getBucketlist).toHaveProperty('type');
    expect(getBucketlist.type).toEqual(bucketlist);

    expect(getBucketlist).toHaveProperty('args');
    expect(getBucketlist.args).toEqual(getBucketlistArgs);

    expect(getBucketlist).toHaveProperty('resolve');
    expect(getBucketlist.resolve).toEqual(bucketlistResolvers.getBucketlist);
  });

  test('updateBucketlist mutation', () => {
    expect(updateBucketlist).toHaveProperty('type');
    expect(updateBucketlist.type).toEqual(bucketlist);

    expect(updateBucketlist).toHaveProperty('args');
    expect(updateBucketlist.args).toEqual(updateBucketlistArgs);

    expect(updateBucketlist).toHaveProperty('resolve');
    expect(updateBucketlist.resolve).toEqual(bucketlistResolvers.updateBucketlist);
  });

  test('deleteBucketlist mutation', () => {
    expect(deleteBucketlist).toHaveProperty('type');
    expect(deleteBucketlist.type).toEqual(successMessage);

    expect(deleteBucketlist).toHaveProperty('args');
    expect(deleteBucketlist.args).toEqual(deleteBucketlistArgs);

    expect(deleteBucketlist).toHaveProperty('resolve');
    expect(deleteBucketlist.resolve).toEqual(bucketlistResolvers.deleteBucketlist);
  });

  test('list mutation', () => {
    expect(list).toHaveProperty('type');
    expect(list.type).toEqual(bucketlists);

    expect(list).toHaveProperty('args');
    expect(list.args).toEqual(listArgs);

    expect(list).toHaveProperty('resolve');
    expect(list.resolve).toEqual(bucketlistResolvers.list);
  });

  test('listAll mutation', () => {
    expect(listAll).toHaveProperty('type');
    expect(listAll.type).toEqual(bucketlists);

    expect(listAll).toHaveProperty('args');
    expect(listAll.args).toEqual(listArgs);

    expect(listAll).toHaveProperty('resolve');
    expect(listAll.resolve).toEqual(bucketlistResolvers.listAll);
  });

  test('explore mutation', () => {
    expect(explore).toHaveProperty('type');
    expect(explore.type).toEqual(bucketlists);

    expect(explore).toHaveProperty('args');
    expect(explore.args).toEqual(listArgs);

    expect(explore).toHaveProperty('resolve');
    expect(explore.resolve).toEqual(bucketlistResolvers.explore);
  });
});
