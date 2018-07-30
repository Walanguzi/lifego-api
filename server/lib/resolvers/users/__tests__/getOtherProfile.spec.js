const getOtherProfile = require('../getOtherProfile');

jest.mock('../../../helpers/userHelper', () => ({
  findOneUser: async (id) => {
    if (id === 'existing id') {
      return {
        id,
      };
    }

    return null;
  },
  findFollowers: async () => [],
}));

describe('getOtherProfile tests', () => {
  test('gets profile successfully', async (done) => {
    const body = {
      id: 'existing id',
    };

    const user = await getOtherProfile(null, body);

    expect(user.id).toEqual(body.id);

    done();
  });

  test('return error if user does not exist', async (done) => {
    const body = {
      id: 'ghost id',
    };

    const error = await getOtherProfile(null, body);

    expect(error.message).toEqual('User not found');

    done();
  });
});

jest.clearAllMocks();
