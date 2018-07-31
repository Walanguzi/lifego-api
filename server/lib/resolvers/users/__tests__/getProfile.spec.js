const getProfile = require('../getProfile');

jest.mock('../../../helpers/userHelper', () => ({
  findOneUser: async id => ({
    id,
  }),
  findFollowers: async () => [],
}));

describe('getProfile tests', () => {
  test('gets profile successfully', async (done) => {
    const body = {
      id: 'existing id',
    };

    const context = {
      decoded: {
        id: 'existing id',
      },
    };

    const user = await getProfile(null, body, context);

    expect(user.id).toEqual(body.id);

    done();
  });
});

jest.clearAllMocks();
