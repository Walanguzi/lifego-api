const create = require('../create');

jest.mock('../../../utils', () => ({
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
  createRecord: async (modelName, options, body) => {
    if (body.name === 'existing name') {
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
  name: 'test',
  bucketlistId: 'existing id',
};

const wrongBody = {
  name: 'test',
  bucketlistId: 'wrong id',
};

const emptyNameBody = {
  name: '',
  bucketlistId: 'existing id',
};

const existingNameBody = {
  name: 'existing name',
  bucketlistId: 'existing id',
};

describe('create tests', () => {
  test('creates successfully', async (done) => {
    const item = await create(null, body, context);

    expect(item.name).toEqual(body.name);

    done();
  });

  test('returns error when name is not provided', async (done) => {
    const error = await create(null, emptyNameBody, context);

    expect(error.message).toEqual('Missing name');
    expect(error.extensions.code).toEqual(400);

    done();
  });

  test('returns error when name is in use', async (done) => {
    const error = await create(null, existingNameBody, context);

    expect(error.message).toEqual('Name already in use');
    expect(error.extensions.code).toEqual(409);

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
