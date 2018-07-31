const changePassword = require('../changePassword');

jest.mock('../../../helpers/userHelper', () => ({
  changePassword: async () => 'token',
  validatePassword: () => true,
}));

jest.mock('jsonwebtoken', () => ({
  verify: (token, secret, callBack) => {
    callBack(null, {
      password: 'correct password',
      email: 'current@email.com',
    });
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

describe('changePassword tests', () => {
  test('changes successfully', async (done) => {
    const request = {
      headers: {
        token: 'valid token',
      },
      body: {
        newPassword: 'new password',
        password: 'correct password',
        confirm: 'new password',
      },
    };

    await changePassword(request, response);

    expect(response.status).toHaveBeenCalledWith(200);

    done();
  });

  test('returns error with mismatching passwords', async (done) => {
    const request = {
      headers: {
        token: 'valid token',
      },
      body: {
        newPassword: 'new password',
        password: 'correct password',
        confirm: 'confirm password',
      },
    };

    await changePassword(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });

    done();
  });

  afterEach(() => {
    response.status.mockClear();
    response.json.mockClear();
  });
});

jest.clearAllMocks();
