const update = require('../update');

jest.mock('../../../utils', () => ({
  updateRecord: async (modelName, options, body) => body,
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };

    return error;
  },
  findOne: async (modelName, { where: body }) => {
    if (body.name === 'existing name') {
      return body;
    }
    return null;
  },
}));

jest.mock('../../../helpers/bucketlistHelper', () => ({
  findBucketlist: async (id) => {
    if (id === 'existing bucketlist') {
      return { id };
    }

    return null;
  },
  addItemUserDetails: async body => body,
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

describe('item update tests', () => {
  test('updates item successfully', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      name: 'new name',
      id: 'existing item',
    };

    const item = await update(null, body, context);

    expect(item.id).toEqual(body.id);

    done();
  });

  test('returns error when bucketlist is not foumd', async (done) => {
    const body = {
      bucketlistId: 'wrong id',
      name: 'new name',
      id: 'existing item',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('Bucketlist not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when item is not foumd', async (done) => {
    const body = {
      bucketlistId: 'existing bucketlist',
      name: 'new name',
      id: 'wrong id',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('Item not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when name is in use', async (done) => {
    const body = {
      id: 'existing item',
      name: 'existing name',
      bucketlistId: 'existing bucketlist',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('An item with that name exists');
    expect(error.extensions.code).toEqual(409);

    done();
  });
});

jest.clearAllMocks();
