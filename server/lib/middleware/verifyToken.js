const jwt = require('jsonwebtoken');
const { findById } = require('../utils');

const secret = process.env.SECRET_KEY;

module.exports = ((request, response, next) => {
  const { headers: { token }, body: { query } } = request;

  if (!query.includes('mutation { explore')) {
    if (token) {
      jwt.verify(token, secret, async (error, decoded) => {
        if (error) {
          response.status(401);
          response.json({
            data: null,
            errors: [{
              message: 'Invalid token',
              code: 401,
            }],
          });
          return;
        }

        const user = await findById('users', decoded.id);

        if (!user) {
          response.status(401);
          response.json({
            data: null,
            errors: [{
              message: 'Invalid token',
              code: 401,
            }],
          });
          return;
        }

        request.decoded = decoded;
        next();
      });

      return;
    }

    response.status(400);
    response.json({
      data: null,
      errors: [{
        message: 'Missing authorization token',
        code: 400,
      }],
    });
  }
  next();
});
