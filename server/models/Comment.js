const generateId = require('uniqid');

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bucketlistId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Comment.belongsTo(models.Bucketlist);
        Comment.belongsTo(models.User);
      },
    },
  });

  return Comment;
};
