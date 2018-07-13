const generateId = require('uniqid');

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('likes', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    bucketlistId: {
      type: DataTypes.INTEGER,
    },
    likerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Like.belongsTo(models.Bucketlist);
        Like.belongsTo(models.User);
      },
    },
  });

  return Like;
};
