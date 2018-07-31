const { GraphQLString } = require('graphql');
const commonTypes = require('../types');

const { successMessage } = commonTypes;

describe('Common types tests', () => {
  test('Index test', () => {
    expect(commonTypes).toHaveProperty('successMessage');
  });

  test('Success message type test', () => {
    expect(successMessage.getFields()).toHaveProperty('message');
    expect(successMessage.getFields().message.type).toEqual(GraphQLString);
  });
});
