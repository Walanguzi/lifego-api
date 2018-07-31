const generateId = require('uniqid');

module.exports = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define('userNotifications', {
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
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    friendId: {
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
        UserNotification.belongsTo(models.User);
      },
    },
  });

  return UserNotification;
};
