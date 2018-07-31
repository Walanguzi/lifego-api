const authRoutes = require('../authRoutes')();

describe('authRoutes tests', () => {
  test('has routes', () => {
    expect(authRoutes.stack[0].route.path).toEqual('/register');
    expect(authRoutes.stack[1].route.path).toEqual('/login');
    expect(authRoutes.stack[2].route.path).toEqual('/social_login');
    expect(authRoutes.stack[3].route.path).toEqual('/change_password');
    expect(authRoutes.stack[4].route.path).toEqual('/reset_password');
    expect(authRoutes.stack[5].route.path).toEqual('/change_email');
    expect(authRoutes.stack[6].route.path).toEqual('/delete_account');
  });
});
