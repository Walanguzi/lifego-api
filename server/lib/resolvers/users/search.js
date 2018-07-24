const { fn } = require('sequelize');
const { findAll } = require('../../utils');

module.exports = async (root, body) => {
  const users = await findAll('users', {
    where: {
      displayName: {
        $ilike: fn('lower', `${body.name.toLowerCase()}%`),
      },
    },
  });

  return users;
};
