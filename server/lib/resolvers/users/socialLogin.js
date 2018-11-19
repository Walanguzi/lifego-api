const jwt = require('jsonwebtoken');

const { findOne } = require('../../utils');

const secret = process.env.SECRET_KEY;
const expires = parseInt(process.env.EXPIRES, 10);

module.exports = async (request, response) => {
  const host = request.useragent.isMobile ? 'OAuthLogin://' : process.env.FRONT_END;
  const user = await findOne('users', { where: { email: request.user.email } });

  if (user) {
    const token = jwt.sign(user.dataValues, secret, { expiresIn: expires });

    response.redirect(`${host}login?token=${token}`);

    return;
  }

  response.redirect(`${host}login?user=${JSON.stringify(request.user)}`);
};
