const { item } = require('../types');
const {
  createItemArgs,
  updateItemArgs,
  deleteItemArgs,
} = require('../arguments');
const itemResolvers = require('../../../lib/resolvers/items');
const { successMessage } = require('../../Common/types');

const {
  createItem,
  updateItem,
  deleteItem,
} = require('../mutations');

describe('Item mutation tests', () => {
  test('createItem mutation', () => {
    expect(createItem).toHaveProperty('type');
    expect(createItem.type).toEqual(item);

    expect(createItem).toHaveProperty('args');
    expect(createItem.args).toEqual(createItemArgs);

    expect(createItem).toHaveProperty('resolve');
    expect(createItem.resolve).toEqual(itemResolvers.createItem);
  });

  test('deleteItem mutation', () => {
    expect(deleteItem).toHaveProperty('type');
    expect(deleteItem.type).toEqual(successMessage);

    expect(deleteItem).toHaveProperty('args');
    expect(deleteItem.args).toEqual(deleteItemArgs);

    expect(deleteItem).toHaveProperty('resolve');
    expect(deleteItem.resolve).toEqual(itemResolvers.deleteItem);
  });

  test('updateItem mutation', () => {
    expect(updateItem).toHaveProperty('type');
    expect(updateItem.type).toEqual(item);

    expect(updateItem).toHaveProperty('args');
    expect(updateItem.args).toEqual(updateItemArgs);

    expect(updateItem).toHaveProperty('resolve');
    expect(updateItem.resolve).toEqual(itemResolvers.updateItem);
  });
});
