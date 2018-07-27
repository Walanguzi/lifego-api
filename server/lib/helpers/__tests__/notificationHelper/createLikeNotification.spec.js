const { createLikeNotification } = require('../../notificationHelper');

jest.mock('../../../resolvers/notifications/create', () => data => data);

describe('createLikeNotification tests', () => {
  test('creates like notification object', async (done) => {
    const context = {
      decoded: {
        id: 'dsvbeefsvefbs',
      },
    };

    const like = {
      bucketlistId: 'dsfdascs',
      likerId: 'afrwswrve',
    };

    const notification = await createLikeNotification(context, like);

    expect(notification.sourceUserId).toEqual(context.decoded.id);
    expect(notification.bucketlistId).toEqual(like.bucketlistId);
    expect(notification.text).toEqual('new like');
    expect(notification.type).toEqual('like');

    done();
  });
});

jest.clearAllMocks();
