module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'bucketlists',
      'jobId',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn({
      tableName: 'bucketlists',
      schema: 'public',
    }, 'jobId');
  },
};
