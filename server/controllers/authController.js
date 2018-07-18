const login = require('../lib/resolvers/users/login');
const register = require('../lib/resolvers/users/register');
const socialLogin = require('../lib/resolvers/users/socialLogin');

module.exports = {
  login,
  register,
  socialLogin,
  changeEmail: () => {},
  changePassword: () => {},
  resetPassword: () => {},
  deleteAccount: () => {},
};
