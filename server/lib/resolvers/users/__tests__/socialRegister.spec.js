const socialLogin = require('../socialLogin');

jest.mock('../../../utils/modelUtils', () => ({
  findOne: async () => null,
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

describe('socialLogin register tests', () => {
  test('returns user', async (done) => {
    await socialLogin(request, response);

    expect(response.redirect).toHaveBeenCalled();

    done();
  });

  afterEach(() => {
    response.redirect.mockClear();
  });
});

jest.clearAllMocks();
