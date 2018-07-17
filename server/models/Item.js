const generateId = require('uniqid');

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('items', {
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
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bucketlistId: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate(models) {
        Item.belongsTo(models.Bucketlist);
      },
    },
  });

  return Item;
};
