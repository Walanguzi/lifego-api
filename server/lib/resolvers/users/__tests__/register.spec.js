const register = require('../register');

jest.mock('../../../helpers/userHelper', () => ({
  createUser: async ({ body: { email } }) => {
    if (email !== 'existing@email.com') {
      return {
        email,
        password: 'correct password',
      };
    }

    return null;
  },
}));

jest.mock('password-hash', () => ({
  generate: () => 'correct password',
}));

const response = {
  json: jest.fn(),
  status: jest.fn(),
};

describe('register tests', () => {
  test('registers successfully', async (done) => {
    const request = {
      body: {
        displayName: 'test',
        email: 'new@email.com',
        password: 'correct password',
      },
    };

    await register(request, response);

    expect(response.status).toHaveBeenCalledWith(201);

    done();
  });

  test('registers successfully from social auth', async (done) => {
    const request = {
      body: {
        displayName: 'test',
        email: 'new@email.com',
        password: 'correct password',
        social: true,
      },
    };

    await register(request, response);

    expect(response.status).toHaveBeenCalledWith(201);

    done();
  });

  test('returns error with existing email', async (done) => {
    const request = {
      body: {
        displayName: 'test',
        email: 'existing@email.com',
        password: 'correct password',
      },
    };

    await register(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Email already in use' });

    done();
  });

  afterEach(() => {
    response.status.mockClear();
    response.json.mockClear();
  });
});

jest.clearAllMocks();
