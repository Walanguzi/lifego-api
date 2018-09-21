const oauth = require('..');

describe('oauth tests', () => {
  test('sets up app', () => {
    const app = {
      use: jest.fn(),
      get: jest.fn(),
    };

    oauth(app);

    expect(app.use).toHaveBeenCalled();
    expect(app.get).toHaveBeenCalled();
  });
});
