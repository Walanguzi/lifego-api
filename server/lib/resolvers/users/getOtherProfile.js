const {
  findOneUser,
  findFollowers,
} = require('../../helpers/userHelper');

const { generateError } = require('../../utils');

module.exports = async (root, body) => {
  const user = await findOneUser(body.id);

  if (!user) {
    return generateError({
      message: 'User not found',
      code: 404,
    });
  }

  user.followers = await findFollowers(body.id);

  return user;
};
