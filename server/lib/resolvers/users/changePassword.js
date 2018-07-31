const jwt = require('jsonwebtoken');

const { validateFields } = require('../../utils');
const { validatePassword, changePassword } = require('../../helpers/userHelper');

const secret = process.env.SECRET_KEY;
const expires = parseInt(process.env.EXPIRES, 10);

module.exports = (request, response) => {
  const keys = ['oldPassword', 'newPassword', 'confirm'];

  validateFields(request, response, keys, () => {
    const { token } = request.headers;
    const { oldPassword, newPassword, confirm } = request.body;

    jwt.verify(token, secret, async (error, decoded) => {
      const valid = validatePassword(error, decoded, oldPassword, newPassword, confirm, response);

      if (newPassword !== confirm) {
        response.status(400);
        response.json({ message: 'Passwords do not match' });
        return;
      }

      if (valid) {
        const newToken = await changePassword(decoded.email, newPassword, secret, expires);

        response.status(200);
        response.json({ message: 'Password changed', token: newToken });
      }
    });
  });
};
