const generateId = require('uniqid');

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('conversations', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => generateId(),
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiverId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    classMethods: {
      associate(models) {
        Conversation.belongsToMany(models.User, { through: 'conversation' });
        Conversation.hasMany(models.Message, {
          as: 'messages',
          onDelete: 'CASCADE',
          foreignKey: {
            name: 'conversationId',
            allowNull: false,
          },
        });
      },
    },
  });

  return Conversation;
};
