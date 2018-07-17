const generateId = require('uniqid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    social: {
      type: DataTypes.BOOLEAN,
    },
    reminders: {
      type: DataTypes.BOOLEAN,
    },
    privacy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'everyone',
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Bucketlist, {
          as: 'bucketlists',
          onDelete: 'cascade',
          foreignKey: {
            name: 'userId',
            allowNull: false,
          },
        });
        User.hasMany(models.Message, {
          as: 'messages',
          onDelete: 'cascade',
          foreignKey: {
            name: 'senderId',
            allowNull: false,
          },
        });
        User.hasMany(models.Like, {
          as: 'likes',
          onDelete: 'cascade',
          foreignKey: {
            name: 'likerId',
            allowNull: false,
          },
        });
        User.hasMany(models.UserNotification, {
          as: 'userNotifications',
          onDelete: 'cascade',
          foreignKey: {
            name: 'userId',
            allowNull: false,
          },
        });
        User.hasMany(models.User, {
          as: 'friends',
          through: 'UserFriends',
        });
        User.belongsToMany(models.User, {
          as: 'friend',
          through: 'UserFriends',
        });
      },
    },
  });

  return User;
};
