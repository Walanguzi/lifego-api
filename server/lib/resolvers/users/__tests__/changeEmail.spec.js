const changeEmail = require('../changeEmail');

jest.mock('../../../helpers/userHelper', () => ({
  changeEmail: async ({ newEmail }) => {
    if (newEmail === 'existing@email.com') {
      return null;
    }

    return 'token';
  },
  sendEmailChangeConfirmation: () => {},
}));

jest.mock('jsonwebtoken', () => ({
  verify: (token, secret, callBack) => {
    if (token === 'valid token') {
      callBack(null, {
        password: 'correct password',
        email: 'current@email.com',
      });
      return;
    }

    callBack('invalid token', { password: 'incorrect password' });
  },
}));

jest.mock('password-hash', () => ({
  verify: (password) => {
    if (password === 'incorrect password') {
      return false;
    }

    return true;
  },
}));

const response = {
  json: jest.fn(),
  status: jest.fn(),
};

describe('changeEmail tests', () => {
  test('changes successfully', async (done) => {
    const request = {
      headers: {
        token: 'valid token',
      },
      body: {
        email: 'new@email.com',
        password: 'correct password',
      },
    };

    await changeEmail(request, response);

    expect(response.json).toHaveBeenCalledTimes(0);

    done();
  });

  test('returns error with invalid token', async (done) => {
    const request = {
      headers: {
        token: 'invalid token',
      },
      body: {
        email: 'new@email.com',
        password: 'correct password',
      },
    };

    await changeEmail(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Invalid token' });

    done();
  });

  test('returns error with wrong password', async (done) => {
    const request = {
      headers: {
        token: 'valid token',
      },
      body: {
        email: 'new@email.com',
        password: 'incorrect password',
      },
    };

    await changeEmail(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Wrong password' });

    done();
  });

  test('returns error with current email', async (done) => {
    const request = {
      headers: {
        token: 'valid token',
      },
      body: {
        email: 'current@email.com',
        password: 'correct password',
      },
    };

    await changeEmail(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Use different email' });

    done();
  });

  test('returns error with existing email', async (done) => {
    const request = {
      headers: {
        token: 'valid token',
      },
      body: {
        email: 'existing@email.com',
        password: 'correct password',
      },
    };

    await changeEmail(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Email already in use' });

    done();
  });

  afterEach(() => {
    response.status.mockClear();
    response.json.mockClear();
  });
});

jest.clearAllMocks();
