const { message } = require('../types');
const {
  createMessageArgs,
  updateMessageArgs,
  deleteMessageArgs,
} = require('../arguments');
const messageResolvers = require('../../../lib/resolvers/messages');
const { successMessage } = require('../../Common/types');

const {
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../mutations');

describe('Message mutation tests', () => {
  test('createMessage mutation', () => {
    expect(createMessage).toHaveProperty('type');
    expect(createMessage.type).toEqual(message);

    expect(createMessage).toHaveProperty('args');
    expect(createMessage.args).toEqual(createMessageArgs);

    expect(createMessage).toHaveProperty('resolve');
    expect(createMessage.resolve).toEqual(messageResolvers.createMessage);
  });

  test('deleteMessage mutation', () => {
    expect(deleteMessage).toHaveProperty('type');
    expect(deleteMessage.type).toEqual(successMessage);

    expect(deleteMessage).toHaveProperty('args');
    expect(deleteMessage.args).toEqual(deleteMessageArgs);

    expect(deleteMessage).toHaveProperty('resolve');
    expect(deleteMessage.resolve).toEqual(messageResolvers.deleteMessage);
  });

  test('updateMessage mutation', () => {
    expect(updateMessage).toHaveProperty('type');
    expect(updateMessage.type).toEqual(message);

    expect(updateMessage).toHaveProperty('args');
    expect(updateMessage.args).toEqual(updateMessageArgs);

    expect(updateMessage).toHaveProperty('resolve');
    expect(updateMessage.resolve).toEqual(messageResolvers.updateMessage);
  });
});
