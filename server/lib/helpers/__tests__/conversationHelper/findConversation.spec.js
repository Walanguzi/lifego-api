const { findConversation } = require('../../conversationHelper');

const {
  createRecord,
  getModel,
} = require('../../../utils');

const users = getModel('users');
const Conversation = getModel('conversations');

let conv;
let user;

describe('findConversation tests', () => {
  beforeEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await Conversation.destroy({
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
    const conversation = await findConversation(conv.id, { decoded: { id: user.id } });

    expect(conversation.id).toEqual(conv.id);

    done();
  });

  test('returns null', async (done) => {
    const conversation = await findConversation('unknown', { decoded: { id: 'sss' } });

    expect(conversation).toEqual(null);

    done();
  });

  afterEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await Conversation.destroy({
      where: {},
    });

    done();
  });
});
