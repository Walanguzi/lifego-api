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
  getModel: () => ({}),
  findById: id => ({ dataValues: { id } }),
  asyncForEach: list => list,
}));

const socket = {
  emit: jest.fn(),
};

const decoded = {
  displayName: 'oliver',
  id: 'dsfcrcadcsc',
  privacy: 'friends',
};

const wrongDecoded = {
  id: 'dsfcrcadcsc',
  privacy: 'friends',
};

const context = {
  socket,
  decoded,
};

const wrongContext = {
  socket,
  decoded: wrongDecoded,
};

const body = {
  name: 'test',
  privacy: 'friends',
};

const wrongBody = {
  privacy: 'friends',
};

describe('create tests', () => {
  test('creates successfully', async (done) => {
    const bucketlist = await create(null, body, context);

    expect(bucketlist.name).toEqual(body.name);
    expect(socket.emit).toHaveBeenCalled();

    done();
  });

  test('returns error when name is not provided', async (done) => {
    const error = await create(null, wrongBody, context);

    expect(error.message).toEqual('Missing name');
    expect(error.extensions.code).toEqual(400);

    done();
  });

  test('returns error when not created', async (done) => {
    const error = await create(null, body, wrongContext);

    expect(error.message).toEqual('Name already in use');
    expect(error.extensions.code).toEqual(409);

    done();
  });

  afterEach(() => {
    context.socket.emit.mockClear();
  });
});

jest.clearAllMocks();
