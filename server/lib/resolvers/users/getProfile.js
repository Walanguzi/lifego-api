const {
  findOneUser,
  findFollowers,
} = require('../../helpers/userHelper');

module.exports = async (root, body, context) => {
  const user = await findOneUser(context.decoded.id);

  user.followers = await findFollowers(body.id);

  return user;
};
