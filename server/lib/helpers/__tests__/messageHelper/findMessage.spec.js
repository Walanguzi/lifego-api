const { findMessage } = require('../../messageHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils/modelUtils');

const users = getModel('users');
const messages = getModel('messages');
const conversations = getModel('conversations');


describe('findMessage tests', () => {
  test('finds a message', async (done) => {
    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    const [{ dataValues: user }] = await createRecord('users', { where: {} }, userData);

    const convData = {
      senderId: user.id,
      receiverId: user.id,
    };
    const [{ dataValues: conversation }] = await createRecord('conversations', { where: {} }, convData);

    const messageData = {
      senderId: user.id,
      content: 'dfbbdbd',
      conversationId: conversation.id,
    };

    const [{ dataValues: message }] = await createRecord('messages', { where: {} }, messageData);

    const queryData = {
      id: message.id,
      conversationId: conversation.id,
    };

    const foundMessage = await findMessage(queryData);

    expect(foundMessage.content).toEqual(messageData.content);

    await users.destroy({
      where: {},
    });

    await messages.destroy({
      where: {},
    });

    await conversations.destroy({
      where: {},
    });

    done();
  });
});
