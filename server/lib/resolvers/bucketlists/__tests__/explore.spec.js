const explore = require('../explore');

jest.mock('../../../utils', () => ({
  findAndCount: async () => ({
    count: 1,
    rows: [{
      name: 'name',
    }],
  }),
}));

jest.mock('../../../helpers/bucketlistHelper', () => ({
  addOtherProps: async ({
    rows,
  }) => ({
    bucketlists: rows,
    nextOffset: 1,
    previousOffset: 1,
  }),
  getAssociationOptions: () => ({}),
}));

describe('explore tests', () => {
  test('returns bucketlists', async (done) => {
    const args = {
      id: 'existing bucketlist',
      offset: 0,
      limit: 1,
      name: 'name',
    };

    const response = await explore(null, args);

    expect(response.bucketlists).toHaveLength(1);

    done();
  });
});

jest.clearAllMocks();
