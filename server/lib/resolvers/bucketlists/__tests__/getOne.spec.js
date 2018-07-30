const getOne = require('../getOne');

jest.mock('../../../utils', () => ({
  findById: async (modelName, id) => {
    if (id === 'existing bucketlist') {
      return { id };
    }

    return null;
  },
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };

    return error;
  },
}));

jest.mock('../../../helpers/bucketlistHelper', () => ({
  addUserProperties: async body => body,
  getAssociationOptions: () => ({}),
}));

describe('getOne tests', () => {
  test('gets one successfully', async (done) => {
    const body = { id: 'existing bucketlist' };

    const bucketlist = await getOne(null, body);

    expect(bucketlist.id).toEqual(body.id);

    done();
  });

  test('returns error when not foumd', async (done) => {
    const error = await getOne(null, { id: 'wrong id' });

    expect(error.message).toEqual('Bucketlist not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
