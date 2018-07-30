const deleteLike = require('../delete');

jest.mock('../../../utils', () => ({
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
  deleteRecord: async () => true,
}));

jest.mock('../../../helpers/bucketlistHelper', () => ({
  findBucketlist: async (id) => {
    if (id === 'existing bucketlist') {
      return { id };
    }

    return null;
  },
}));

jest.mock('../../../helpers/likeHelper', () => ({
  findLike: async (id) => {
    if (id === 'existing like') {
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

describe('deleteLike tests', () => {
  test('deleteLikes successfully', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      id: 'existing like',
    };

    const response = await deleteLike(null, body, context);

    expect(response.message).toEqual('success');

    done();
  });

  test('returns error when bucketlist is not foumd', async (done) => {
    const body = {
      bucketlistId: 'wrong bucketlist',
      id: 'existing like',
    };

    const error = await deleteLike(null, body, context);

    expect(error.message).toEqual('Bucketlist not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when like is not foumd', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      like: 'wrong like',
    };

    const error = await deleteLike(null, body, context);

    expect(error.message).toEqual('Like not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
