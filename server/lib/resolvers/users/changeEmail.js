const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

const { validateFields } = require('../../utils');
const { changeEmail, sendEmailChangeConfirmation } = require('../../helpers/userHelper');

const secret = process.env.SECRET_KEY;
const expires = parseInt(process.env.EXPIRES, 10);

module.exports = (request, response) => {
  validateFields(request, response, ['email', 'password'], () => {
    const { token } = request.headers;
    const newEmail = request.body.email;
    const { password } = request.body;

    jwt.verify(token, secret, async (error, decoded) => {
      if (!passwordHash.verify(password, decoded.password)) {
        response.status(401);
        response.json({ message: 'Wrong password' });
        return;
      }

      if (error) {
        response.status(401);
        response.json({ message: 'Invalid token' });
        return;
      }

      const { email } = decoded;

      if (email === newEmail) {
        response.status(400);
        response.json({ message: 'Use different email' });
        return;
      }

      const newToken = await changeEmail(newEmail, email, secret, expires);

      if (!newToken) {
        response.status(409);
        response.json({ message: 'Email already in use' });
        return;
      }

      sendEmailChangeConfirmation(newEmail, newToken, response);
    });
  });
};
