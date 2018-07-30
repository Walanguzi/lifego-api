const create = require('../create');

jest.mock('../../../utils', () => ({
  createRecord: async (modelName, options, body) => [body, true],
  findById: async () => ({
    displayName: 'test',
    pictureUrl: null,
    sourceUserId: 'id',
  }),
}));

describe('create notification tests', () => {
  test('creates successfully', async (done) => {
    const context = {
      decoded: {
        id: 'id',
      },
      socket: {
        emit: () => {},
      },
    };

    const data = {
      type: 'comment',
      bucketlistId: 'id',
      text: 'new',
      sourceUserId: 'id',
    };

    const notification = await create(data, context);

    expect(notification.user).toEqual('test');

    done();
  });
});

jest.clearAllMocks();
