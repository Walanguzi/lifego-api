const {
  filterByPrivacy,
  getAssociationOptions,
} = require('../../bucketlistHelper');

const {
  createRecord,
  getModel,
  findAll,
  findOne,
} = require('../../../utils');

const users = getModel('users');
const lists = getModel('bucketlists');

const associationOptions = getAssociationOptions();

describe('filterByPrivacy tests', () => {
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

    const friendData = {
      displayName: 'test friend',
      email: 'test@friend.com',
      username: 'test@friend.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    const strangerData = {
      displayName: 'test stranger',
      email: 'test@stranger.com',
      username: 'test@stranger.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    const [user] = await createRecord('users', { where: userData }, userData);

    const [friend] = await createRecord('users', { where: friendData }, friendData);

    await createRecord('users', { where: strangerData }, strangerData);

    await user.addFriend(friend);

    const bucketlistEveryoneData = {
      name: 'test',
      createdBy: 'test user',
      privacy: 'everyone',
      userId: user.id,
    };

    const bucketlistFriendData = {
      name: 'test two',
      createdBy: 'test user',
      privacy: 'friends',
      userId: user.id,
    };

    await createRecord('bucketlists', {
      where: {
        name: bucketlistEveryoneData.name,
        userId: user.id,
      },
    }, bucketlistEveryoneData);

    await createRecord('bucketlists', {
      where: {
        name: bucketlistFriendData.name,
        userId: user.id,
      },
    }, bucketlistFriendData);

    done();
  });

  test('returns bucketlists for everyone privacy setting', async (done) => {
    const stranger = await findOne('users', { where: { email: 'test@stranger.com' } });
    const context = {
      decoded: {
        id: stranger.id,
      },
    };

    const bucketlists = await findAll('bucketlists', { where: {}, ...associationOptions });
    const returnBucketlists = await filterByPrivacy(bucketlists, context);

    expect(returnBucketlists).toHaveLength(1);

    done();
  });

  test('returns bucketlists for friends privacy setting', async (done) => {
    const friend = await findOne('users', { where: { email: 'test@friend.com' } });

    const contextFriend = {
      decoded: {
        id: friend.id,
      },
    };

    const bucketlists = await findAll('bucketlists', { where: {}, ...associationOptions });
    const returnBucketlists = await filterByPrivacy(bucketlists, contextFriend);

    expect(returnBucketlists).toHaveLength(2);

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
