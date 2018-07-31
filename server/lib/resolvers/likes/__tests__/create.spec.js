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
  addLikeUserDetails: async body => body,
}));

jest.mock('../../../helpers/notificationHelper', () => ({
  createLikeNotification: async (context, body) => {
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
  likerId: 'test',
  bucketlistId: 'existing id',
};

const wrongBody = {
  likerId: 'test',
  bucketlistId: 'wrong id',
};

const emptyBody = {
  likerId: '',
  bucketlistId: 'existing id',
};

describe('create tests', () => {
  test('creates successfully', async (done) => {
    const like = await create(null, body, context);

    expect(like.likerId).toEqual(body.likerId);

    done();
  });

  test('returns error when likerId is not provided', async (done) => {
    const error = await create(null, emptyBody, context);

    expect(error.message).toEqual('Missing liker id');
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
