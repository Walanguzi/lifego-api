const passwordHash = require('password-hash');
const {
  findById,
  generateError,
  deleteRecord,
} = require('../../utils');

module.exports = async (root, body, context) => {
  if (!body.email) {
    return generateError({
      message: 'Email cannot be empty',
      code: 400,
    });
  }
  if (!body.password) {
    return generateError({
      message: 'Password cannot be empty',
      code: 400,
    });
  }

  if (body.email !== context.decoded.email) {
    return generateError({
      message: 'Wrong email',
      code: 401,
    });
  }

  const user = await findById('users', context.decoded.id);

  if (!passwordHash.verify(body.password, user.password)) {
    return generateError({
      message: 'Wrong password',
      code: 401,
    });
  }

  await deleteRecord('users', context.decoded.id);

  return {
    message: 'Success',
  };
};
