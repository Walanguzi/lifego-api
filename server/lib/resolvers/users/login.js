const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

const { validateFields } = require('../../utils/validationUtils');
const { findByEmail } = require('../../helpers/userHelper');

const secret = process.env.SECRET_KEY;
const expires = parseInt(process.env.EXPIRES, 10);

module.exports = (request, response) => {
  validateFields(request, response, ['password'], async () => {
    const user = await findByEmail(request.body.email);

    if (!user || !passwordHash.verify(request.body.password, user.password)) {
      response.status(401);
      response.json({ message: 'Wrong email or password' });
      return;
    }

    const token = jwt.sign(user.toJSON(), secret, { expiresIn: expires });

    response.status(200);
    response.json({ token, message: 'Successfully logged in' });
  });
};
