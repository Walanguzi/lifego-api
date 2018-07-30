const listAll = require('../listAll');

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
  filterByPrivacy: async rows => rows,
}));

describe('listAll tests', () => {
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

    const response = await listAll(null, args, context);

    expect(response.bucketlists).toHaveLength(1);

    done();
  });
});

jest.clearAllMocks();
