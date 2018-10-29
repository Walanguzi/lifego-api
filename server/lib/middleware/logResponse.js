const mung = require('express-mung');

module.exports = mung.json(({ token, password, ...response }, req, res) => {
  const body = response;

  body.statusCode = res.statusCode;

  req.app.get('logger').log('info', JSON.stringify({
    url: req.url,
    method: req.method,
    date: new Date(Date.now()),
  }));
}, { mungError: true });
