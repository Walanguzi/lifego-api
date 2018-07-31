const authController = require('../authController');

describe('auth controller tests', () => {
  test('has all resolvers', () => {
    expect(authController).toHaveProperty('login');
    expect(authController).toHaveProperty('register');
    expect(authController).toHaveProperty('socialLogin');
    expect(authController).toHaveProperty('changeEmail');
    expect(authController).toHaveProperty('changePassword');
    expect(authController).toHaveProperty('resetPassword');
    expect(authController).toHaveProperty('deleteAccount');

    expect(typeof authController.login).toEqual('function');
    expect(typeof authController.register).toEqual('function');
    expect(typeof authController.socialLogin).toEqual('function');
    expect(typeof authController.changeEmail).toEqual('function');
    expect(typeof authController.changePassword).toEqual('function');
    expect(typeof authController.resetPassword).toEqual('function');
    expect(typeof authController.deleteAccount).toEqual('function');
  });
});
