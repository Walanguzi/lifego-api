const update = require('../update');

jest.mock('../../../utils', () => ({
  updateRecord: async (modelName, options, body) => body,
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };

    return error;
  },
  findById: async (model, id) => {
    if (id === 'existing bucketlist') {
      return { id };
    }

    return null;
  },
}));

jest.mock('../../../helpers/bucketlistHelper', () => ({
  addCommentUserDetails: async body => body,
}));

jest.mock('../../../helpers/commentHelper', () => ({
  findComment: async ({ id }) => {
    if (id === 'existing comment') {
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

describe('comment update tests', () => {
  test('updates comment successfully', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      content: 'new content',
      id: 'existing comment',
    };

    const comment = await update(null, body, context);

    expect(comment.id).toEqual(body.id);

    done();
  });

  test('returns error when bucketlist is not foumd', async (done) => {
    const body = {
      bucketlistId: 'wrong id',
      content: 'new content',
      id: 'existing comment',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('Bucketlist not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when comment is not foumd', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      content: 'new content',
      id: 'wrong id',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('Comment not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
