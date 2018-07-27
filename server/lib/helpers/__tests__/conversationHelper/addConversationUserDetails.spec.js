const { addConversationUserDetails } = require('../../conversationHelper');

const {
  createRecord,
  getModel,
} = require('../../../utils');

const users = getModel('users');
const Message = getModel('users');
const Conversation = getModel('conversations');

let conv;
let user;

describe('addConversationUserDetails tests', () => {
  beforeEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await Conversation.destroy({
      where: {},
    });

    await Message.destroy({
      where: {},
    });

    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    [user] = await createRecord('users', { where: {} }, userData);

    const data = {
      senderId: user.id,
      receiverId: user.id,
    };

    [conv] = await createRecord('conversations', {
      where: data,
    }, data);

    done();
  });

  test('returns conversation', async (done) => {
    const conversation = await addConversationUserDetails(conv);

    expect(conversation.senderDisplayName).toEqual(user.displayName);

    done();
  });

  afterEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await Conversation.destroy({
      where: {},
    });

    await Message.destroy({
      where: {},
    });

    done();
  });
});
