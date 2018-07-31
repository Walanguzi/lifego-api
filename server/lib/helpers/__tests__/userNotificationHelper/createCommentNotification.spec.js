const { createAddNotification } = require('../../userNotificationHelper');

jest.mock('../../../resolvers/userNotifications/create', () => data => data);

describe('createAddNotification tests', () => {
  test('creates add friend notification object', async (done) => {
    const context = {
      decoded: {
        id: 'dsvbeefsvefbs',
        displayName: 'test user',
      },
    };

    const friend = {
      id: 'dsfdascs',
    };

    const userNotification = await createAddNotification(context, friend);

    expect(userNotification.userId).toEqual(context.decoded.id);
    expect(userNotification.text).toEqual(`<b>${context.decoded.displayName}<b> added you as a friend.`);
    expect(userNotification.type).toEqual('new');

    done();
  });
});

jest.clearAllMocks();
