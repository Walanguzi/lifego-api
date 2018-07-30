const removeFriend = require('../removeFriend');

jest.mock('../../../helpers/userHelper', () => ({
  findOneUser: async (id) => {
    if (id === 'existing user') {
      return ({
        id: 'existing user',
        friends: [{
          id: 'existing user',
        },
        {
          id: 'ghost friend',
        }],
        removeFriend: async () => {},
      });
    }

    if (id === 'existing user') {
      return ({
        id: 'existing user',
      });
    }

    return null;
  },
}));

jest.mock('../../../helpers/userNotificationHelper', () => ({
  createAddNotification: async () => {},
}));

const socket = {
  emit: () => {},
};

describe('removeFriend tests', () => {
  test('removes successfully', async (done) => {
    const context = {
      decoded: {
        id: 'existing user',
      },
      socket,
    };

    const body = {
      id: 'existing user',
    };

    const response = await removeFriend(null, body, context);

    expect(response.message).toEqual('Success');

    done();
  });

  test('return error if user is not a friend', async (done) => {
    const context = {
      decoded: {
        id: 'existing user',
      },
      socket,
    };

    const body = {
      id: 'existing friend',
    };

    const error = await removeFriend(null, body, context);

    expect(error.message).toEqual('User is not a friend');
    expect(error.extensions.code).toEqual(404);

    done();
  });

  test('return error if user does not exist', async (done) => {
    const context = {
      decoded: {
        id: 'existing user',
      },
      socket,
    };

    const body = {
      id: 'ghost friend',
    };

    const error = await removeFriend(null, body, context);

    expect(error.message).toEqual('User not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
