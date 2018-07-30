const create = require('../create');

jest.mock('../../../utils', () => ({
  createRecord: async (modelName, options, body) => [body, true],
  findById: async () => ({
    displayName: 'test',
    pictureUrl: null,
  }),
}));

describe('create userNotification tests', () => {
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
      userId: 'id',
      text: 'new',
      friendId: 'id',
    };

    const userNotification = await create(data, context);

    expect(userNotification.user).toEqual('test');

    done();
  });
});

jest.clearAllMocks();
