const listOther = require('../listOther');

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

describe('listOther tests', () => {
  test('returns bucketlists', async (done) => {
    const args = {
      offset: 0,
      limit: 1,
      name: 'name',
      id: 'id',
    };

    const response = await listOther(null, args);

    expect(response.bucketlists).toHaveLength(1);

    done();
  });
});

jest.clearAllMocks();
