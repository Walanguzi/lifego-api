const { changePassword } = require('../../userHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils');


jest.mock('jsonwebtoken', () => ({
  sign: () => 'token',
}));

describe('changePassword tests', () => {
  beforeEach(async (done) => {
    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: 'password',
      privacy: 'friends',
    };

    await createRecord('users', { where: userData }, userData);

    done();
  });

  test('changes and return token', async (done) => {
    const data = {
      email: 'test@user.com',
      newPassword: 'new password',
      secret: 'secret',
      expires: 10000,
    };

    const token = await changePassword(data);

    expect(token).toEqual('token');

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
