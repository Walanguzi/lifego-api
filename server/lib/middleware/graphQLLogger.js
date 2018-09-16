module.exports = (req, res, next) => {
  const originalWrite = res.write;

  res.write = (data) => {
    req.app.get('logger').log('info', JSON.stringify({
      request: req.rawHeaders.filter((header, i) => {
        if (['token', 'Token'].includes(header) || ['token', 'Token'].includes(i > 0 && req.rawHeaders[i - 1] === 'token')) {
          return false;
        }
        return true;
      }),
      response: data,
      date: new Date(Date.now()),
    }));

    return originalWrite.call(res, data);
  };

  next();
};
