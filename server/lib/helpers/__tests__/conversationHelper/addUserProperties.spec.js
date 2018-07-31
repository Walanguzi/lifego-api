const {
  addUserProperties,
  getAssociationOptions,
} = require('../../conversationHelper');

const {
  createRecord,
  getModel,
  findAll,
} = require('../../../utils');

const associationOptions = getAssociationOptions();

const users = getModel('users');
const messages = getModel('messages');
const Conversation = getModel('conversations');

describe('addUserProperties', () => {
  beforeEach(async () => {
    await users.destroy({
      where: {},
    });

    await messages.destroy({
      where: {},
    });

    await Conversation.destroy({
      where: {},
    });
  });

  test('Adds user details', async (done) => {
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

    const [{ dataValues: newConv }] = await createRecord('conversations', { where: {} }, convData);

    const messageData = {
      senderId: user.id,
      content: 'dfbbdbd',
      conversationId: newConv.id,
    };

    await createRecord('messages', { where: {} }, messageData);

    const rows = await findAll('conversations', { ...associationOptions });

    const conversations = await addUserProperties(rows);

    const [conversation] = conversations;

    const [message] = conversation.messages;

    expect(conversation.senderDisplayName).toEqual(user.displayName);
    expect(message.user).toEqual(user.displayName);

    done();
  });

  afterEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await messages.destroy({
      where: {},
    });

    done();
  });
});
