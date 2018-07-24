const {
  updateRecord,
  generateError,
} = require('../../utils');

module.exports = async (root, body, context) => {
  if (Object.keys(body).includes('displayName') && !body.displayName) {
    return generateError({
      message: 'Display name cannot be empty',
      code: 400,
    });
  }

  if (Object.keys(body).includes('privacy') && !body.privacy) {
    return generateError({
      message: 'Privacy cannot be empty',
      code: 400,
    });
  }

  const profile = await updateRecord('users', {
    where: {
      id: context.decoded.id,
    },
  }, body);

  return profile;
};
