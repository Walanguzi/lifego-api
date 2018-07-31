const socialLogin = require('../socialLogin');

jest.mock('../../../helpers/userHelper', () => ({
  createUser: async ({ body: { email } }) => ({
    email,
    password: 'correct password',
  }),
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

describe('socialLogin tests', () => {
  test('logs in successfully', async (done) => {
    const request = {
      body: {
        displayName: 'test user',
        email: 'existing@email.com',
      },
    };

    await socialLogin(request, response);

    expect(response.json).toHaveBeenCalledWith({
      token: 'token',
      message: `Welcome ${request.body.displayName}`,
    });

    done();
  });

  test('returns error without email', async (done) => {
    const request = {
      body: {
        password: 'correct password',
      },
    };

    await socialLogin(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Email or password missing' });

    done();
  });

  afterEach(() => {
    response.status.mockClear();
    response.json.mockClear();
  });
});

jest.clearAllMocks();
