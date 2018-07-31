const { item } = require('./types');
const {
  createItemArgs,
  updateItemArgs,
  deleteItemArgs,
} = require('./arguments');
const {
  deleteItem,
  updateItem,
  createItem,
} = require('../../lib/resolvers/items');
const { successMessage } = require('../Common/types');

module.exports = {
  createItem: {
    type: item,
    args: createItemArgs,
    resolve: createItem,
  },
  updateItem: {
    type: item,
    args: updateItemArgs,
    resolve: updateItem,
  },
  deleteItem: {
    type: successMessage,
    args: deleteItemArgs,
    resolve: deleteItem,
  },
};
