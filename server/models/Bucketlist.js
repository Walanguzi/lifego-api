const generateId = require('uniqid');

module.exports = (sequelize, DataTypes) => {
  const Bucketlist = sequelize.define('bucketlists', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    privacy: {
      type: DataTypes.STRING,
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
        Bucketlist.hasMany(models.Item, {
          as: 'items',
          onDelete: 'cascade',
          foreignKey: {
            name: 'bucketlistId',
            allowNull: false,
          },
        });
        Bucketlist.hasMany(models.Comment, {
          as: 'comments',
          onDelete: 'cascade',
          foreignKey: {
            name: 'bucketlistId',
            allowNull: false,
          },
        });
        Bucketlist.hasMany(models.Like, {
          as: 'likes',
          onDelete: 'cascade',
          foreignKey: {
            name: 'bucketlistId',
            allowNull: false,
          },
        });
        Bucketlist.hasMany(models.Notification, {
          as: 'notifications',
          onDelete: 'cascade',
          foreignKey: {
            name: 'bucketlistId',
            allowNull: false,
          },
        });
        Bucketlist.belongsTo(models.User);
      },
    },
  });

  return Bucketlist;
};
