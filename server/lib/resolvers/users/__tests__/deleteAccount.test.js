const deleteAccount = require('../deleteAccount');

jest.mock('../../../utils', () => ({
  findById: async () => ({
    password: 'correct password',
  }),
  deleteRecord: () => {},
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
}));

describe('deleteAccount tests', () => {
  test('deletes successfully', async (done) => {
    const body = {
      email: 'test@user.com',
      password: 'correct password',
    };

    const context = {
      decoded: {
        email: 'test@user.com',
      },
    };

    const response = await deleteAccount(null, body, context);

    expect(response.message).toEqual('Success');

    done();
  });

  test('returns error with missing email', async (done) => {
    const body = {
      password: 'correct password',
    };

    const context = {
      decoded: {
        email: 'test@user.com',
      },
    };

    const error = await deleteAccount(null, body, context);

    expect(error.message).toEqual('Email cannot be empty');

    done();
  });

  test('returns error with missing password', async (done) => {
    const body = {
      email: 'test@user.com',
    };

    const context = {
      decoded: {
        email: 'test@user.com',
      },
    };

    const error = await deleteAccount(null, body, context);

    expect(error.message).toEqual('Password cannot be empty');

    done();
  });

  test('returns error with wrong email', async (done) => {
    const body = {
      email: 'wrong@user.com',
      password: 'correct password',
    };

    const context = {
      decoded: {
        email: 'test@user.com',
        password: 'correct password',
      },
    };

    const error = await deleteAccount(null, body, context);

    expect(error.message).toEqual('Wrong email');

    done();
  });

  test('returns error with wrong password', async (done) => {
    const body = {
      email: 'test@user.com',
      password: 'incorrect password',
    };

    const context = {
      decoded: {
        email: 'test@user.com',
        password: 'correct password',
      },
    };

    const error = await deleteAccount(null, body, context);

    expect(error.message).toEqual('Wrong password');

    done();
  });
});

jest.mock('password-hash', () => ({
  verify: (password, currentPassword) => {
    if (password !== currentPassword) {
      return false;
    }

    return true;
  },
}));

jest.clearAllMocks();
