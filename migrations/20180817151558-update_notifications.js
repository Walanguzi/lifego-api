module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'notifications',
      'read',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'notifications',
      'read',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
    );
  },
};
