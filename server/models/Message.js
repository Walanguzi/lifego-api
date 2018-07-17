const generateId = require('uniqid');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('messages', {
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    conversationId: {
      type: DataTypes.INTEGER,
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
        Message.belongsTo(models.Conversation);
        Message.belongsTo(models.User);
      },
    },
  });

  return Message;
};
