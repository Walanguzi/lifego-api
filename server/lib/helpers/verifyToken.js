const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

module.exports = ((request, response, next) => {
  const { originalUrl, headers: { token } } = request;

  if (originalUrl.includes('app')) {
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
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

    response.json({
      data: null,
      errors: [{
        message: 'Missing authorization token',
        code: 400,
      }],
    });
  } else {
    next();
  }
});
