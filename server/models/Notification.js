const generateId = require('uniqid');

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notifications', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bucketlistId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sourceUserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Notification.belongsTo(models.Bucketlist);
      },
    },
  });

  return Notification;
};
