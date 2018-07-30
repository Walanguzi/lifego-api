const login = require('../login');

jest.mock('../../../helpers/userHelper', () => ({
  findByEmail: async (email) => {
    if (email === 'existing@email.com') {
      return {
        email,
        password: 'correct password',
      };
    }

    return null;
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: () => 'token',
}));

jest.mock('password-hash', () => ({
  verify: (password, currentPassword) => {
    if (password !== currentPassword) {
      return false;
    }

    return true;
  },
}));

const response = {
  json: jest.fn(),
  status: jest.fn(),
};

describe('login tests', () => {
  test('logs in successfully', async (done) => {
    const request = {
      body: {
        email: 'existing@email.com',
        password: 'correct password',
      },
    };

    await login(request, response);

    expect(response.json).toHaveBeenCalledWith({
      token: 'token',
      message: 'Successfully logged in',
    });

    done();
  });

  test('returns error with wrong password', async (done) => {
    const request = {
      body: {
        email: 'existing@email.com',
        password: 'incorrect password',
      },
    };

    await login(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Wrong email or password' });

    done();
  });

  test('returns error with wrong email', async (done) => {
    const request = {
      body: {
        email: 'wrong@email.com',
        password: 'correct password',
      },
    };

    await login(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Wrong email or password' });

    done();
  });

  afterEach(() => {
    response.status.mockClear();
    response.json.mockClear();
  });
});

jest.clearAllMocks();
