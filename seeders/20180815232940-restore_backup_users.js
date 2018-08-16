const users = require('../backup/users.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('users', users);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('users');
  },
};
