const list = require('../list');

jest.mock('../../../utils', () => ({
  findAll: async () => [{
    senderId: 'id',
  }],
}));

jest.mock('../../../helpers/conversationHelper', () => ({
  addUserProperties: async rows => rows,
  getAssociationOptions: () => ({}),
}));

describe('list tests', () => {
  test('returns conversations', async (done) => {
    const context = {
      decoded: {
        id: 'id',
      },
    };

    const conversations = await list(null, null, context);

    expect(conversations).toHaveLength(1);

    done();
  });
});

jest.clearAllMocks();
