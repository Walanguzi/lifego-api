const mung = require('express-mung');

module.exports = mung.json(({ token, password, ...rest }, req, res) => {
  const body = rest;

  body.statusCode = res.statusCode;

  req.app.get('logger').log('info', JSON.stringify({
    request: req.rawHeaders.filter((header, i) => {
      if (['token', 'Token'].includes(header) || ['token', 'Token'].includes(req.rawHeaders[i - 1])) return false;

      return true;
    }),
    response: body,
    date: new Date(Date.now()),
  }));
}, { mungError: true });
