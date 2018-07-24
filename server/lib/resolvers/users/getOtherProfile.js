const {
  findOneUser,
  findFollowers,
} = require('../../helpers/userHelper');

module.exports = async (root, body) => {
  const user = await findOneUser(body.id);

  user.followers = await findFollowers(body.id);

  return user;
};
