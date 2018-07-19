module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('conversations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    senderId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    receiverId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    userId: {
      type: Sequelize.STRING,
    },
  }),
  down: queryInterface => queryInterface.dropTable('conversations'),
};
