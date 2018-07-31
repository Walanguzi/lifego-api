const create = require('../create');

jest.mock('../../../utils', () => ({
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
  createRecord: async (modelName, options, body) => {
    if (!body.senderId) {
      return [body, false];
    }
    return [body, true];
  },
  findById: async (modelName, id) => {
    if (id === 'existing id') {
      return { id };
    }

    return null;
  },
}));

jest.mock('../../../helpers/conversationHelper', () => ({
  addConversationUserDetails: async body => body,
}));

const socket = {
  emit: jest.fn(),
};

const decoded = {
  displayName: 'oliver',
  id: 'dsfcrcadcsc',
  privacy: 'friends',
};

const context = {
  socket,
  decoded,
};

const body = {
  senderId: 'existing id',
  receiverId: 'existing id',
};

const wrongBody = {
  senderId: 'existing id',
  receiverId: 'wrong id',
};

const emptyBody = {
  receiverId: 'existing id',
};

describe('create tests', () => {
  test('creates conversation successfully', async (done) => {
    const conversation = await create(null, body, context);

    expect(conversation.receiverId).toEqual(body.receiverId);
    expect(socket.emit).toHaveBeenCalled();

    done();
  });

  test('returns error when receiver does not exist', async (done) => {
    const error = await create(null, wrongBody, context);

    expect(error.message).toEqual('Receiver does not exist');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when conversation already exists', async (done) => {
    const error = await create(null, emptyBody, context);

    expect(error.message).toEqual('Conversation already exists');
    expect(error.extensions.code).toEqual(409);

    done();
  });

  afterEach(() => {
    context.socket.emit.mockClear();
  });
});

jest.clearAllMocks();
