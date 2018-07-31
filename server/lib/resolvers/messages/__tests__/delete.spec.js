const deleteMessage = require('../delete');

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

jest.mock('../../../helpers/messageHelper', () => ({
  findMessage: async ({ id }) => {
    if (id === 'existing message') {
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

describe('deleteMessage tests', () => {
  test('deleteMessages successfully', async (done) => {
    const body = {
      conversationId: 'existing conversation',
      id: 'existing message',
    };

    const response = await deleteMessage(null, body, context);

    expect(response.message).toEqual('success');

    done();
  });

  test('returns error when conversation is not foumd', async (done) => {
    const body = {
      conversationId: 'wrong conversation',
      id: 'existing message',
    };

    const error = await deleteMessage(null, body, context);

    expect(error.message).toEqual('Conversation not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when message is not foumd', async (done) => {
    const body = {
      conversationId: 'existing conversation',
      message: 'wrong message',
    };

    const error = await deleteMessage(null, body, context);

    expect(error.message).toEqual('Message not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
