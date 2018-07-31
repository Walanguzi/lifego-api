const { createCommentNotification } = require('../../notificationHelper');

jest.mock('../../../resolvers/notifications/create', () => data => data);

describe('createCommentNotification tests', () => {
  test('creates comment notification object', async (done) => {
    const context = {
      decoded: {
        id: 'dsvbeefsvefbs',
      },
    };

    const comment = {
      bucketlistId: 'dsfdascs',
      content: 'afrwswrve',
    };

    const notification = await createCommentNotification(context, comment);

    expect(notification.sourceUserId).toEqual(context.decoded.id);
    expect(notification.text).toEqual(comment.content);
    expect(notification.type).toEqual('comment');

    done();
  });
});

jest.clearAllMocks();
