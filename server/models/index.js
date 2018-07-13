const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.bucketlists.hasMany(db.items);
db.bucketlists.hasMany(db.comments);
db.bucketlists.hasMany(db.likes);
db.conversations.hasMany(db.messages);
db.users.hasMany(db.bucketlists);
db.users.hasMany(db.conversations);
db.users.hasMany(db.users);

db.users.belongsToMany(db.users, {
  as: 'friends',
  through: 'UserFriends',
});
db.comments.belongsTo(db.bucketlists);
db.likes.belongsTo(db.bucketlists);
db.items.belongsTo(db.bucketlists);
db.messages.belongsTo(db.users);
db.messages.belongsTo(db.conversations);
db.bucketlists.belongsTo(db.users);

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
