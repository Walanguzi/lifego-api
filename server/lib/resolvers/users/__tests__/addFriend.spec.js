const addFriend = require('../addFriend');

jest.mock('../../../helpers/userHelper', () => ({
  findOneUser: async (id) => {
    if (id === 'existing user') {
      return ({
        id: 'existing user',
        friends: [{
          id: 'existing friend',
        }],
        addFriend: async () => {},
      });
    }

    if (id === 'new friend') {
      return ({
        id: 'new friend',
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

describe('addFriend tests', () => {
  test('add successfully', async (done) => {
    const context = {
      decoded: {
        id: 'existing user',
      },
      socket,
    };

    const body = {
      id: 'new friend',
    };

    const response = await addFriend(null, body, context);

    expect(response.message).toEqual('Success');

    done();
  });

  test('return error if user is already a friend', async (done) => {
    const context = {
      decoded: {
        id: 'existing user',
      },
      socket,
    };

    const body = {
      id: 'existing friend',
    };

    const error = await addFriend(null, body, context);

    expect(error.message).toEqual('User is already a friend');
    expect(error.extensions.code).toEqual(409);

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
      id: 'ghost user',
    };

    const error = await addFriend(null, body, context);

    expect(error.message).toEqual('User not found');
    expect(error.extensions.code).toEqual(404);

    done();
  });
});

jest.clearAllMocks();
