const list = require('../list');

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

describe('list tests', () => {
  test('returns bucketlists', async (done) => {
    const context = {
      decoded: {
        id: 'id',
      },
    };

    const args = {
      id: 'existing bucketlist',
      offset: 0,
      limit: 1,
      name: 'name',
    };

    const response = await list(null, args, context);

    expect(response.bucketlists).toHaveLength(1);

    done();
  });
});

jest.clearAllMocks();
