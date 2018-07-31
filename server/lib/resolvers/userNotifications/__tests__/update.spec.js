const update = require('../update');

jest.mock('../../../utils', () => ({
  updateRecord: async (modelName, options, body) => body,
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };

    return error;
  },
  findById: async (modelName, id) => {
    if (id === 'existing userNotification') {
      return {
        id,
        read: true,
      };
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

describe('userNotification update tests', () => {
  test('returns userNotification if read', async (done) => {
    const body = {
      id: 'existing userNotification',
      read: true,
    };

    const userNotification = await update(null, body, context);

    expect(userNotification.read).toBeTruthy();

    done();
  });

  test('returns error when userNotification is not foumd', async (done) => {
    const body = {
      id: 'wrong id',
    };

    const error = await update(null, body, context);

    expect(error.message).toEqual('Notification not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
