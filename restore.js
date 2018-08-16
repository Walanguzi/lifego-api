const generateId = require('uniqid');
const bucketlists = require('./backup/bucketlists.json');
const users = require('./backup/users.json');


const { bucketlists: Bucketlist } = require('./server/models');
const { users: User } = require('./server/models');

bucketlists.forEach(({
  createdAt, updatedAt, dueDate, ...bucketlist
}) => {
  Bucketlist.create(bucketlist);
});

users.forEach(({
  createdAt, updatedAt, ...user
}) => {
  User.create({
    ...user,
    username: generateId(),
    displayName: user.displayName || 'Anonymous User',
    reminders: true,
    privacy: 'friends',
    social: typeof user.social === 'boolean' ? user.social : false,
  });
});
