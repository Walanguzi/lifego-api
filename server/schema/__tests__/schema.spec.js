const schema = require('..');

const { _typeMap: typeMap } = schema;

describe('Schema tests', () => {
  test('Query test', () => {
    expect(typeMap).toHaveProperty('RootQuery');
  });

  test('Mutation test', () => {
    expect(typeMap).toHaveProperty('RootMutation');
  });

  test('Query types test', () => {
    expect(typeMap).toHaveProperty('bucketlist');
    expect(typeMap).toHaveProperty('bucketlists');
    expect(typeMap).toHaveProperty('comment');
    expect(typeMap).toHaveProperty('item');
    expect(typeMap).toHaveProperty('like');
    expect(typeMap).toHaveProperty('conversation');
    expect(typeMap).toHaveProperty('message');
    expect(typeMap).toHaveProperty('user');
    expect(typeMap).toHaveProperty('users');
    expect(typeMap).toHaveProperty('userNotification');
    expect(typeMap).toHaveProperty('notification');
    expect(typeMap).toHaveProperty('successMessage');
  });
});
