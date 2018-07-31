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


jest.mock('../../../helpers/notificationHelper', () => ({
  addDetails: async notifications => ({
    read: notifications,
    unread: notifications,
  }),
}));

describe('list notifications tests', () => {
  test('returns notifications', async (done) => {
    const context = {
      decoded: {
        id: 'id',
      },
    };

    const notifications = await list(null, null, context);

    expect(notifications).toHaveLength(2);

    done();
  });
});

jest.clearAllMocks();
