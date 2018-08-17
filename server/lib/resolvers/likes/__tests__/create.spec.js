const create = require('../create');

jest.mock('../../../utils', () => ({
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
  createRecord: async (modelName, options, body) => {
    if (!body.createdBy) {
      return [{ dataValues: body }, false];
    }
    return [{ dataValues: body }, true];
  },
  findById: async (model, id) => {
    if (id === 'existing id') {
      return { id };
    }

    return null;
  },
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
  bucketlistId: 'existing id',
};

const wrongBody = {
  likerId: 'test',
  bucketlistId: 'wrong id',
};

describe('create tests', () => {
  test('likes successfully', async (done) => {
    const like = await create(null, body, context);

    expect(like.likerId).toEqual(context.decoded.id);

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
