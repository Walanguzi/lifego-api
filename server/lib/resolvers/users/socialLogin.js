const jwt = require('jsonwebtoken');

const { validateFields } = require('../../utils/validationUtils');
const { createUser } = require('../../helpers/userHelper');

const secret = process.env.SECRET_KEY;
const expires = parseInt(process.env.EXPIRES, 10);

module.exports = (request, response) => {
  if (!('email' in request.body)) {
    response.status(400);
    response.json({ message: 'Email or password missing' });
    return;
  }

  validateFields(request, response, ['displayName'], async () => {
    const user = await createUser(request);

    const token = jwt.sign(user, secret, { expiresIn: expires });

    response.status(200);
    response.json({ token, message: `Welcome ${request.body.displayName}` });
  });
};
