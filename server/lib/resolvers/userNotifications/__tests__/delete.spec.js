const deleteNotification = require('../delete');

jest.mock('../../../utils', () => ({
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
  deleteRecord: async () => true,
  findById: async (modelName, id) => {
    if (id === 'existing userNotification') {
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

describe('deleteNotification tests', () => {
  test('deletes userNotifications successfully', async (done) => {
    const response = await deleteNotification(null, { id: 'existing userNotification' }, context);

    expect(response.message).toEqual('Success');

    done();
  });

  test('returns error when not foumd', async (done) => {
    const error = await deleteNotification(null, { id: 'wrong id' }, context);

    expect(error.message).toEqual('Notification not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
