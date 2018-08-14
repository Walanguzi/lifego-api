const update = require('../update');

jest.mock('../../../utils', () => ({
  updateRecord: async (modelName, options, body) => ({ dataValues: body }),
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };

    return error;
  },
  findById: async (modelName, id) => {
    if (modelName === 'users') {
      return {};
    }

    if (id === 'existing userNotification') {
      return {
        id,
        read: false,
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

describe('userNotification update success tests', () => {
  test('marks as read successfully', async (done) => {
    const body = {
      id: 'existing userNotification',
      read: false,
    };

    const userNotification = await update(null, body, context);

    expect(userNotification.read).toBeTruthy();

    done();
  });
});

jest.clearAllMocks();
