const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const { validatePassword } = require('../../userHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils');

let user;
let authUser;

describe('validatePassword tests', () => {
  beforeEach(async (done) => {
    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: passwordHash.generate('password'),
      privacy: 'friends',
    };

    [user] = await createRecord('users', { where: userData }, userData);

    const secret = 'secret';

    const token = jwt.sign(user.toJSON(), secret, { expiresIn: 10000 });

    jwt.verify(token, secret, async (error, decoded) => {
      authUser = decoded;
    });

    done();
  });

  test('validation passes', async (done) => {
    const data = {
      error: null,
      decoded: authUser,
      oldPassword: 'password',
      newPassword: 'new password',
      confirm: 'new password',
      response: {
        status: jest.fn(),
        json: jest.fn(),
      },
    };

    const valid = validatePassword(data);

    expect(valid).toBeTruthy();

    done();
  });

  test('validation fails if token is invalid', (done) => {
    const data = {
      error: 'invalid token',
      decoded: authUser,
      oldPassword: 'password',
      newPassword: 'new password',
      confirm: 'new password',
      response: {
        status: jest.fn(),
        json: jest.fn(),
      },
    };

    const valid = validatePassword(data);

    expect(valid).toBeFalsy();
    expect(data.response.status).toHaveBeenCalledWith(401);
    expect(data.response.json).toHaveBeenCalledWith({ message: 'Invalid token' });

    done();
  });

  test('validation fails if old password is used as new password', (done) => {
    const data = {
      error: null,
      decoded: authUser,
      oldPassword: 'password',
      newPassword: 'password',
      confirm: 'new password',
      response: {
        status: jest.fn(),
        json: jest.fn(),
      },
    };

    const valid = validatePassword(data);

    expect(valid).toBeFalsy();
    expect(data.response.status).toHaveBeenCalledWith(400);
    expect(data.response.json).toHaveBeenCalledWith({ message: 'Do not use old password' });

    done();
  });

  test('validation fails if old password is wrong', (done) => {
    const data = {
      error: null,
      decoded: authUser,
      oldPassword: 'wrong password',
      newPassword: 'password',
      confirm: 'new password',
      response: {
        status: jest.fn(),
        json: jest.fn(),
      },
    };

    const valid = validatePassword(data);

    expect(valid).toBeFalsy();
    expect(data.response.status).toHaveBeenCalledWith(401);
    expect(data.response.json).toHaveBeenCalledWith({ message: 'Wrong password' });

    done();
  });

  test('validation fails if new password confirmation fails', (done) => {
    const data = {
      error: null,
      decoded: authUser,
      oldPassword: 'password',
      newPassword: 'new password',
      confirm: 'new wrong password',
      response: {
        status: jest.fn(),
        json: jest.fn(),
      },
    };

    const valid = validatePassword(data);

    expect(valid).toBeFalsy();
    expect(data.response.status).toHaveBeenCalledWith(400);
    expect(data.response.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });

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
