const update = require('../update');

jest.mock('../../../utils', () => ({
  findOne: async (modelName, options) => {
    if (options.where.name === 'existing name') {
      return true;
    }

    return false;
  },
  updateRecord: async (modelName, options, body) => body,
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };

    return error;
  },
  findById: async (modelName, id) => {
    if (id === 'existing bucketlist') {
      return { id, reminders: true };
    }

    return false;
  },
}));

jest.mock('../../../helpers/bucketlistHelper', () => ({
  findBucketlist: async (id) => {
    if (id === 'existing bucketlist') {
      return { id };
    }

    return null;
  },
  addUserProperties: bucketlist => bucketlist,
  handleDueDate: async ({ body }) => body,
}));

const socket = {
  emit: () => {},
};

const decoded = {
  id: 'dfsfsdx',
  reminders: true,
};

const context = {
  socket,
  decoded,
};

describe('update tests', () => {
  test('updates successfully', async (done) => {
    const body = {
      id: 'existing bucketlist',
      name: 'new name',
      dueDate: '2018-08-15 20:18:00+03',
    };

    const bucketlist = await update(null, body, context);

    expect(bucketlist.id).toEqual(body.id);

    done();
  });

  test('returns error when bucketlist is not foumd', async (done) => {
    const body = {
      id: 'wrong id',
      name: 'existing name',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('Bucketlist not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('returns error when name exists', async (done) => {
    const body = {
      id: 'existing bucketlist',
      name: 'existing name',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('A bucketlist with that name exists');
    expect(error.extensions.code).toEqual(409);

    done();
  });
});

jest.clearAllMocks();
