const { findOneUser } = require('../../userHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils');

let user;

describe('findOneUser tests', () => {
  beforeEach(async (done) => {
    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    [user] = await createRecord('users', { where: userData }, userData);

    done();
  });

  test('finds a user', async (done) => {
    const foundUser = await findOneUser(user.id);

    expect(foundUser.id).toEqual(user.id);
    expect(foundUser).toHaveProperty('friends');

    done();
  });

  test('return null if user does not exist', async (done) => {
    const foundUser = await findOneUser('wrong_id');

    expect(foundUser).toEqual(null);

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
