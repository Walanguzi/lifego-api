module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('conversations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    senderId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    receiverId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('conversations'),
};
