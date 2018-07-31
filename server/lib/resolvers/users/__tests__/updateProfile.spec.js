const updateProfile = require('../updateProfile');

jest.mock('../../../utils', () => ({
  updateRecord: async (modelName, options, body) => body,
  generateError: ({ message, code }) => {
    const error = new Error(message);
    error.extensions = { code };
    return error;
  },
}));

describe('updateProfile tests', () => {
  test('updates successfully', async (done) => {
    const body = {
      displayName: 'displayName',
      privacy: 'everyone',
    };

    const context = {
      decoded: {
        id: 'id',
      },
    };

    const profile = await updateProfile(null, body, context);

    expect(profile.displayName).toEqual(body.displayName);

    done();
  });

  test('returns error with empty displayName', async (done) => {
    const body = {
      displayName: '',
      privacy: 'everyone',
    };

    const context = {
      decoded: {
        id: 'id',
      },
    };

    const error = await updateProfile(null, body, context);

    expect(error.message).toEqual('Display name cannot be empty');

    done();
  });

  test('returns error with wrong email', async (done) => {
    const body = {
      displayName: 'displayName',
      privacy: '',
    };

    const context = {
      decoded: {
        id: 'id',
      },
    };

    const error = await updateProfile(null, body, context);

    expect(error.message).toEqual('Privacy cannot be empty');

    done();
  });
});

jest.clearAllMocks();
