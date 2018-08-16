const bucketlists = require('../backup/bucketlists.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('bucketlists', bucketlists);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('bucketlists');
  },
};
