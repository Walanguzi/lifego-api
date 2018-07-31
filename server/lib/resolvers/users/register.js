const passwordHash = require('password-hash');

const { validateFields } = require('../../utils/validationUtils');
const { createUser } = require('../../helpers/userHelper');

module.exports = (request, response) => {
  const keys = ['displayName', 'email', 'password'];

  validateFields(request, response, keys, async () => {
    request.body.password = passwordHash.generate(request.body.password);

    request.body.username = request.body.email;

    let user = await createUser(request);

    if (!user) {
      response.status(409);
      response.json({ message: 'Email already in use' });
      return;
    }

    user = user.toJSON();
    const {
      password, username, userId, ...rest
    } = user;
    user = rest;

    const message = request.body.social ? '' : 'Successfully registered';

    response.status(201);
    response.json({
      message,
      user,
    });
  });
};
