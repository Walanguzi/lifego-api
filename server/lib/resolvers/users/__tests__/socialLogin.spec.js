const socialLogin = require('../socialLogin');

jest.mock('../../../utils/modelUtils', () => ({
  findOne: async () => ({}),
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
  redirect: jest.fn(),
};

const request = {
  user: {
    displayName: 'test user',
    email: 'test@email.com',
  },
  useragent: {
    isMobile: false,
  },
};

describe('socialLogin login tests', () => {
  test('logs in successfully', async (done) => {
    await socialLogin(request, response);

    expect(response.redirect).toHaveBeenCalled();

    done();
  });

  afterEach(() => {
    response.redirect.mockClear();
  });
});

jest.clearAllMocks();
