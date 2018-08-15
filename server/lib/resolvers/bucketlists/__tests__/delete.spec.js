const deleteBucketlist = require('../delete');

jest.mock('../../../utils', () => ({
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
  deleteRecord: async () => true,
  findById: async (modelName, id) => {
    if (id === 'existing id') {
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

describe('deleteBucketlist tests', () => {
  test('deleteBucketlists successfully', async (done) => {
    const response = await deleteBucketlist(null, {
      id: 'existing bucketlist',
      dueDate: '2018-08-15 20:18:00+03',
    }, context);

    expect(response.message).toEqual('success');

    done();
  });

  test('returns error when not foumd', async (done) => {
    const error = await deleteBucketlist(null, { id: 'wrong id' }, context);

    expect(error.message).toEqual('Bucketlist not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
