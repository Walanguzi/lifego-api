const {
  generatePassword,
  asyncForEach,
  generateError,
} = require('../miscellaneousUtils');

describe('Miscellaneous utils tests', () => {
  test('generatePassword tests', () => {
    const password = generatePassword();

    expect(password).toHaveLength(10);
  });

  test('asyncForEach tests', async (done) => {
    const callback = jest.fn();
    const items = [1, 2];

    await asyncForEach(items, callback);

    expect(callback).toHaveBeenCalledTimes(2);

    done();
  });

  test('generateError tests', () => {
    const errorDetails = {
      message: 'Not found',
      code: 404,
    };

    const error = generateError(errorDetails);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual(errorDetails.message);
    expect(error.extensions.code).toEqual(errorDetails.code);
  });
});
