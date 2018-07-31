const { createUser } = require('../../userHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils');

const userData = {
  displayName: 'test user',
  email: 'test@user.com',
  username: 'test@user.com',
  password: 'fgfvsvd',
  privacy: 'friends',
};

describe('createUser tests', () => {
  beforeEach(async (done) => {
    await createRecord('users', { where: userData }, userData);

    done();
  });

  test('creates a user', async (done) => {
    const body = {
      displayName: 'another user',
      email: 'another@user.com',
      username: 'another@user.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    const request = { body };

    const newUser = await createUser(request);

    expect(newUser.displayName).toEqual(body.displayName);

    done();
  });

  test('creates a user from social auth', async (done) => {
    const body = {
      ...userData,
      social: true,
    };

    const request = { body };

    const newUser = await createUser(request);

    expect(newUser.displayName).toEqual(body.displayName);

    done();
  });

  test('return null if user exists', async (done) => {
    const request = { body: userData };

    const newUser = await createUser(request);

    expect(newUser).toEqual(null);

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
