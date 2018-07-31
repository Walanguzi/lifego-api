const { findBucketlist } = require('../../bucketlistHelper');

const {
  createRecord,
  getModel,
} = require('../../../utils');

const users = getModel('users');
const lists = getModel('bucketlists');

let buck;
let user;

describe('findBucketlist tests', () => {
  beforeEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await lists.destroy({
      where: {},
    });

    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    [user] = await createRecord('users', { where: {} }, userData);

    const data = {
      name: 'test',
      createdBy: 'test user',
      privacy: 'everyone',
      userId: user.id,
    };

    [buck] = await createRecord('bucketlists', {
      where: {
        name: data.name,
        userId: data.userId,
      },
    }, data);

    done();
  });

  test('returns bucketlist', async (done) => {
    const bucketlist = await findBucketlist(buck.id, { decoded: { id: user.id } });

    expect(bucketlist.id).toEqual(buck.id);

    done();
  });

  test('returns null', async (done) => {
    const bucketlist = await findBucketlist('unknown', { decoded: { id: 'sss' } });

    expect(bucketlist).toEqual(null);

    done();
  });

  afterEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await lists.destroy({
      where: {},
    });

    done();
  });
});
