const resetPassword = require('../resetPassword');

jest.mock('../../../helpers/userHelper', () => ({
  findByEmail: async (email) => {
    if (email === 'existing@email.com') {
      return ({
        email,
      });
    }

    return null;
  },
  sendResetConfirmation: () => {},
}));

const response = {
  json: jest.fn(),
  status: jest.fn(),
};

describe('resetPassword tests', () => {
  test('resets successfully', async (done) => {
    const request = {
      body: {
        email: 'existing@email.com',
      },
    };

    await resetPassword(request, response);

    expect(response.json).toHaveBeenCalledTimes(0);

    done();
  });

  test('returns error with wrong email', async (done) => {
    const request = {
      body: {
        email: 'wring@email.com',
      },
    };

    await resetPassword(request, response);

    expect(response.json).toHaveBeenCalledWith({ message: 'Your have not registered with us yet' });

    done();
  });

  afterEach(() => {
    response.status.mockClear();
    response.json.mockClear();
  });
});

jest.clearAllMocks();
