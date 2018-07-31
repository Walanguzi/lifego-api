const { changeEmail } = require('../../userHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils');


jest.mock('jsonwebtoken', () => ({
  sign: () => 'token',
}));

describe('changeEmail tests', () => {
  beforeEach(async (done) => {
    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    await createRecord('users', { where: userData }, userData);

    done();
  });

  test('changes and return token', async (done) => {
    const data = {
      email: 'test@user.com',
      newEmail: 'users@test.com',
      secret: 'secret',
      expires: 10000,
    };

    const token = await changeEmail(data);

    expect(token).toEqual('token');

    done();
  });

  test('return null if email is in use', async (done) => {
    const data = {
      email: 'test@user.com',
      newEmail: 'test@user.com',
      secret: 'secret',
      expires: 10000,
    };

    const token = await changeEmail(data);

    expect(token).toEqual(null);

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

jest.clearAllMocks();
