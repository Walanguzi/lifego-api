const deleteItem = require('../delete');

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

jest.mock('../../../helpers/itemHelper', () => ({
  findItem: async ({ id }) => {
    if (id === 'existing item') {
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

describe('deleteItem tests', () => {
  test('deleteItems successfully', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      id: 'existing item',
    };

    const response = await deleteItem(null, body, context);

    expect(response.message).toEqual('success');

    done();
  });

  test('returns error when bucketlist is not foumd', async (done) => {
    const body = {
      bucketlistId: 'wrong bucketlist',
      id: 'existing item',
    };

    const error = await deleteItem(null, body, context);

    expect(error.message).toEqual('Bucketlist not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when item is not foumd', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      item: 'wrong item',
    };

    const error = await deleteItem(null, body, context);

    expect(error.message).toEqual('Item not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
