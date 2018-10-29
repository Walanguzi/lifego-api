module.exports = (req, res, next) => {
  const originalWrite = res.write;

  res.write = (response) => {
    req.app.get('logger').log('info', JSON.stringify({
      method: req.method,
      query: req.body,
      response,
      date: new Date(Date.now()),
    }));

    return originalWrite.call(res, response);
  };

  next();
};
