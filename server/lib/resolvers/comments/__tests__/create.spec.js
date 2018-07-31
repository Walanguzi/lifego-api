const create = require('../create');

jest.mock('../../../utils', () => ({
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
  createRecord: async (modelName, options, body) => {
    if (!body.createdBy) {
      return [body, false];
    }
    return [body, true];
  },
}));

jest.mock('../../../helpers/bucketlistHelper', () => ({
  findBucketlist: async (id) => {
    if (id === 'existing id') {
      return { id };
    }

    return null;
  },
  addCommentUserDetails: async body => body,
}));

jest.mock('../../../helpers/notificationHelper', () => ({
  createCommentNotification: async (context, body) => {
    if (context.decoded.displayName) {
      return body;
    }
    return null;
  },
}));

const socket = {
  emit: () => {},
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
  content: 'test',
  bucketlistId: 'existing id',
};

const wrongBody = {
  content: 'test',
  bucketlistId: 'wrong id',
};

const emptyContentBody = {
  content: '',
  bucketlistId: 'existing id',
};

describe('create tests', () => {
  test('creates successfully', async (done) => {
    const comment = await create(null, body, context);

    expect(comment.content).toEqual(body.content);

    done();
  });

  test('returns error when content is not provided', async (done) => {
    const error = await create(null, emptyContentBody, context);

    expect(error.message).toEqual('Missing content');
    expect(error.extensions.code).toEqual(400);

    done();
  });

  test('returns error when bucketlist is not foumd', async (done) => {
    const error = await create(null, wrongBody, context);

    expect(error.message).toEqual('Bucketlist not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
