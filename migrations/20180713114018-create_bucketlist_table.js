module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('bucketlists', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdBy: {
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
    userId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    pictureUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    privacy: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }),
  down: queryInterface => queryInterface.dropTable('bucketlists'),
};
