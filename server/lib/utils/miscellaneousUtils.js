const generatePassword = () => {
  let password = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 10; i += 1) {
    password += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return password;
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array); // eslint-disable-line no-await-in-loop
  }
};

const generateError = ({ message, code }) => {
  const error = new Error(message);
  error.extensions = { code };

  return error;
};

const formatError = ({ app, req }) => ({ message, extensions }) => {
  const errorResponse = {
    message,
    code: extensions ? extensions.code : 500,
  };

  app.get('logger').error(JSON.stringify({
    ...errorResponse,
    request: {
      headers: req.rawHeaders.filter((header, i) => {
        if (['token', 'Token'].includes(header) || ['token', 'Token'].includes(req.rawHeaders[i - 1])) return false;

        return true;
      }),
      body: req.body,
    },
  }));

  return errorResponse;
};


module.exports = {
  generatePassword,
  asyncForEach,
  generateError,
  formatError,
};
