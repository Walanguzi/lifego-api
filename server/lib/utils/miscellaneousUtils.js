const generatePassword = () => {
  let password = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 10; i += 1) {
    password += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return password;
};

const stringifyFunctions = (obj) => {
  const obJect = obj;

  Object.keys(obJect).filter(key => key !== 'social').forEach((key) => {
    if (typeof (obJect[key]) === 'function') {
      obJect[key] = obJect[key].toString();
    }
  });

  return obJect;
};

const evalFunctions = (obj) => {
  const obJect = obj;
  obJect.value = JSON.parse(obJect.value);
  obJect.value = eval(obJect.value); // eslint-disable-line no-eval

  return obJect;
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

module.exports = {
  generatePassword,
  stringifyFunctions,
  evalFunctions,
  asyncForEach,
  generateError,
};
