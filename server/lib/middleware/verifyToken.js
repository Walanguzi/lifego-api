const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

module.exports = ((request, response, next) => {
  const { headers: { token } } = request;

  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
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
});
