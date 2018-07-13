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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
        Conversation.belongsToMany(models.User, { through: 'conversation' });
        Conversation.hasMany(models.Message, {
          as: 'messages',
          onDelete: 'cascade',
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
