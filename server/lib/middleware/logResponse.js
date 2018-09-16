const mung = require('express-mung');

module.exports = mung.json(({ token, password, ...rest }, req, res) => {
  const body = rest;

  body.statusCode = res.statusCode;

  req.app.get('logger').log('info', JSON.stringify({
    request: req.rawHeaders.filter((header, i) => {
      if (header === 'token' || (i > 0 && req.rawHeaders[i - 1] === 'token')) {
        return false;
      }
      return true;
    }),
    response: body,
    date: new Date(Date.now()),
  }));
}, { mungError: true });
