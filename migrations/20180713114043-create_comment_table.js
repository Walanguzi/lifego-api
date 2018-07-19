module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('comments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    senderId: {
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
    bucketlistId: {
      type: Sequelize.STRING,
    },
  }),
  down: queryInterface => queryInterface.dropTable('comments'),
};
