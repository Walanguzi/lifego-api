const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');
const { items } = require('../../models');

const item = new GraphQLObjectType({
  name: 'item',
  fields: attributeFields(items),
});

module.exports = {
  item,
};
