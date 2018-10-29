const mung = require('express-mung');

module.exports = mung.json((data, req, res) => {
  req.app.get('logger').log('info', JSON.stringify({
    url: req.originalUrl,
    method: req.method,
    status: res.statusCode,
    date: new Date(Date.now()),
  }));
}, { mungError: true });
