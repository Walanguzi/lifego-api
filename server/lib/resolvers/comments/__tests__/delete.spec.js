const deleteComment = require('../delete');

jest.mock('../../../utils', () => ({
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
  deleteRecord: async () => true,
  findById: async (model, id) => {
    if (id === 'existing bucketlist') {
      return { id };
    }

    return null;
  },
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

describe('deleteComment tests', () => {
  test('deleteComments successfully', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      id: 'existing comment',
    };

    const response = await deleteComment(null, body, context);

    expect(response.message).toEqual('success');

    done();
  });

  test('returns error when bucketlist is not foumd', async (done) => {
    const body = {
      bucketlistId: 'wrong bucketlist',
      id: 'existing comment',
    };

    const error = await deleteComment(null, body, context);

    expect(error.message).toEqual('Bucketlist not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when comment is not foumd', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      comment: 'wrong comment',
    };

    const error = await deleteComment(null, body, context);

    expect(error.message).toEqual('Comment not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
