const { findFollowers } = require('../../userHelper');
const {
  createRecord,
  getModel,
  findById,
} = require('../../../utils');

let user;
let follower;

describe('findFollowers tests', () => {
  beforeEach(async (done) => {
    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    const followerData = {
      displayName: 'test follower',
      email: 'test@follower.com',
      username: 'test@follower.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    const [followerUser] = await createRecord('users', { where: followerData }, followerData);

    [user] = await createRecord('users', { where: userData }, userData);

    follower = await findById('users', followerUser.id, { plain: true });

    await follower.addFriend(user);

    done();
  });

  test('finds followers', async (done) => {
    const followers = await findFollowers(user.id);

    const [returnedFollower] = followers;

    expect(returnedFollower.displayName).toEqual(follower.displayName);

    done();
  });

  afterEach(async (done) => {
    const users = getModel('users');

    await users.destroy({
      where: {},
    });

    done();
  });
});
