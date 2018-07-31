const update = require('../update');

jest.mock('../../../utils', () => ({
  updateRecord: async (modelName, options, body) => body,
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };

    return error;
  },
}));

jest.mock('../../../helpers/conversationHelper', () => ({
  findConversation: async (id) => {
    if (id === 'existing conversation') {
      return { id };
    }

    return null;
  },
  addMessageUserDetails: async body => body,
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

describe('message update tests', () => {
  test('updates message successfully', async (done) => {
    const body = {
      conversationId: 'existing conversation',
      content: 'new content',
      id: 'existing message',
    };

    const message = await update(null, body, context);

    expect(message.id).toEqual(body.id);

    done();
  });

  test('returns error when conversation is not foumd', async (done) => {
    const body = {
      conversationId: 'wrong id',
      content: 'new content',
      id: 'existing message',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('Conversation not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when message is not foumd', async (done) => {
    const body = {
      conversationId: 'existing conversation',
      content: 'new content',
      id: 'wrong id',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('Message not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
