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
      allowNull: true,
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
          onDelete: 'CASCADE',
          hooks: true,
          foreignKey: {
            name: 'userId',
            allowNull: false,
          },
        });
        User.hasMany(models.Like, {
          as: 'likes',
          onDelete: 'CASCADE',
          foreignKey: {
            name: 'likerId',
            allowNull: false,
          },
        });
        User.hasMany(models.UserNotification, {
          as: 'userNotifications',
          onDelete: 'CASCADE',
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
