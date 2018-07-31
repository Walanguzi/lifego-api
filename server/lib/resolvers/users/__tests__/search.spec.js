const search = require('../search');

jest.mock('../../../utils', () => ({
  findAll: async () => [{ displayName: 'name' }],
}));

describe('search tests', () => {
  test('searches successfully', async (done) => {
    const body = {
      name: 'name',
    };

    const users = await search(null, body);

    expect(users).toHaveLength(1);

    done();
  });
});

jest.clearAllMocks();
