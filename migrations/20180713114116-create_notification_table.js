module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('notifications', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    bucketlistId: {
      type: Sequelize.STRING,
    },
    sourceUserId: {
      type: Sequelize.STRING,
    },
    read: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
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
  down: queryInterface => queryInterface.dropTable('notifications'),
};
