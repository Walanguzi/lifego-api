const { findByEmail } = require('../../userHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils');

let user;

describe('findByEmail tests', () => {
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
    const foundUser = await findByEmail(user.email);

    expect(foundUser.id).toEqual(user.id);

    done();
  });

  test('return null if user does not exist', async (done) => {
    const foundUser = await findByEmail('wrong_email');

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
