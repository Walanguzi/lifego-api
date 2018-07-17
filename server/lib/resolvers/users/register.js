const passwordHash = require('password-hash');
const { users: User } = require('../../../models');

module.exports = async (root, body) => {
  const args = body;

  await new Promise((resolve) => {
    resolve(args.password = passwordHash.generate(args.password));
  });

  const [user, created] = await User.findOrCreateUser({
    where: {
      email: args.email,
    },
    defaults: args,
  });

  if (!args.social) {
    if (created) {
      return user;
    }
    return Object.assign(new Error('Email already in use'), { extensions: { code: 409 } });
  }

  return user;
};
