const list = require('../list');

jest.mock('../../../utils', () => ({
  findAll: async () => [{
    read: false,
  }],
  asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array); // eslint-disable-line no-await-in-loop
    }
  },
}));


jest.mock('../../../helpers/userNotificationHelper', () => ({
  addDetails: async userNotifications => ({
    read: userNotifications,
    unread: userNotifications,
  }),
}));

describe('list userNotifications tests', () => {
  test('returns userNotifications', async (done) => {
    const context = {
      decoded: {
        id: 'id',
      },
    };

    const userNotifications = await list(null, null, context);

    expect(userNotifications).toHaveLength(2);

    done();
  });
});

jest.clearAllMocks();
