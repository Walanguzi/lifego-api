const deleteConversation = require('../delete');

jest.mock('../../../utils', () => ({
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
  deleteRecord: async () => true,
}));

jest.mock('../../../helpers/conversationHelper', () => ({
  findConversation: async (id) => {
    if (id === 'existing conversation') {
      return { id };
    }

    return null;
  },
}));

const socket = {
  emit: () => {},
};

const decoded = {
  id: 'dfsfsdx',
};

const context = {
  socket,
  decoded,
};

describe('deleteConversation tests', () => {
  test('deleteConversations successfully', async (done) => {
    const response = await deleteConversation(null, { id: 'existing conversation' }, context);

    expect(response.message).toEqual('Success');

    done();
  });

  test('returns error when not foumd', async (done) => {
    const error = await deleteConversation(null, { id: 'wrong id' }, context);

    expect(error.message).toEqual('Conversation does not exist');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
