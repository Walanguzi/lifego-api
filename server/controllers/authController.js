const login = require('../lib/resolvers/users/login');
const register = require('../lib/resolvers/users/register');
const socialLogin = require('../lib/resolvers/users/socialLogin');
const changeEmail = require('../lib/resolvers/users/changeEmail');
const changePassword = require('../lib/resolvers/users/changePassword');
const resetPassword = require('../lib/resolvers/users/resetPassword');
const deleteAccount = require('../lib/resolvers/users/deleteAccount');

module.exports = {
  login,
  register,
  socialLogin,
  changeEmail,
  changePassword,
  resetPassword,
  deleteAccount,
};
