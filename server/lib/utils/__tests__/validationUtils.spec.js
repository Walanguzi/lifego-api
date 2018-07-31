const {
  validateFields,
  validateNotification,
} = require('../validationUtils');

describe('Validate fields tests', () => {
  const response = {
    status: jest.fn(),
    json: jest.fn(),
  };

  const callback = jest.fn();

  afterEach(() => {
    response.json.mockClear();
    response.status.mockClear();
  });

  test('Validates fields', () => {
    const keys = ['email', 'password'];

    const body = {
      email: 'sdsvfs@svfvs.com',
      password: 'dfdsvfvfsvs',
    };

    const request = {
      body,
    };

    validateFields(request, response, keys, callback);

    expect(callback).toHaveBeenCalled();
  });

  test('Returns error on few fields', () => {
    const keys = ['email', 'password'];

    const body = {
      email: 'sdsvfs@svfvs.com',
    };

    const request = {
      body,
    };

    validateFields(request, response, keys, callback);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(400);

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ message: 'Email or password missing' });
  });

  test('Returns error on empty fields', () => {
    const keys = ['email', 'password'];

    const body = {
      email: '',
      password: 'efddvdvd',
    };

    const request = {
      body,
    };

    validateFields(request, response, keys, callback);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(400);

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ message: 'email is empty' });
  });

  test('Returns error on invalid email', () => {
    const keys = ['email', 'password'];

    const body = {
      email: 'sscdcsccscs',
      password: 'efddvdvd',
    };

    const request = {
      body,
    };

    validateFields(request, response, keys, callback);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(400);

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ message: 'Invalid email' });
  });

  test('Returns error on invalid username', () => {
    const keys = ['username', 'password'];

    const body = {
      username: 'sscdc#sccscs',
      password: 'efddvdvd',
    };

    const request = {
      body,
    };

    validateFields(request, response, keys, callback);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(400);

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ message: 'Username cannot have special characters' });
  });
});

describe('Validate notification tests', () => {
  test('Returns error on missing field', () => {
    const keys = ['text', 'bucketlistId'];

    const data = {
      text: 'sccscs',
    };

    const response = validateNotification(data, keys);

    expect(response).toEqual({
      message: 'bucketlistId is missing',
    });
  });
});
