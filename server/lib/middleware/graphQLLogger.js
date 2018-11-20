module.exports = (req, res, next) => {
  const originalWrite = res.write;

  res.write = (response) => {
    req.app.get('logger').log('info', {
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      date: new Date(Date.now()),
    });

    return originalWrite.call(res, response);
  };

  next();
};
