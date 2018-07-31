const verifyToken = require('../verifyToken');

jest.mock('jsonwebtoken', () => ({
  verify: (token, secret, callBack) => {
    if (token === 'valid token') {
      callBack(null, {
        id: 'existing id',
        password: 'correct password',
        email: 'current@email.com',
      });
      return;
    }

    if (token === 'deleted user token') {
      callBack(null, {
        id: 'deleted id',
        password: 'correct password',
        email: 'current@email.com',
      });

      return;
    }

    callBack('invalid token', { password: 'incorrect password' });
  },
}));

jest.mock('../../utils', () => ({
  findById: async (modelName, id) => {
    if (id === 'existing id') {
      return { id };
    }

    return null;
  },
}));

const response = {
  json: jest.fn(),
  status: jest.fn(),
};

const next = jest.fn();

describe('verifyToken tests', () => {
  test('validation passes', async (done) => {
    const request = {
      headers: {
        token: 'valid token',
      },
      body: {
        query: '',
      },
    };

    await verifyToken(request, response, next);

    expect(next).toHaveBeenCalledTimes(1);

    done();
  });

  test('skips validation on explore query', async (done) => {
    const request = {
      headers: {
        token: 'valid token',
      },
      body: {
        query: 'mutation {  explore }',
      },
    };

    await verifyToken(request, response, next);

    expect(next).toHaveBeenCalledTimes(1);

    done();
  });

  test('return error on invalid token', async (done) => {
    const request = {
      headers: {
        token: 'invalid token',
      },
      body: {
        query: '',
      },
    };

    await verifyToken(request, response, next);

    expect(response.status).toHaveBeenCalledWith(401);

    done();
  });

  test('return error on missing token', async (done) => {
    const request = {
      headers: {},
      body: {
        query: '',
      },
    };

    await verifyToken(request, response, next);

    expect(response.status).toHaveBeenCalledWith(400);

    done();
  });

  test('return error on deleted user token', async (done) => {
    const request = {
      headers: {
        token: 'deleted user token',
      },
      body: {
        query: '',
      },
    };

    await verifyToken(request, response, next);

    expect(response.status).toHaveBeenCalledWith(401);

    done();
  });

  afterEach(() => {
    response.status.mockClear();
    response.json.mockClear();
    next.mockClear();
  });
});

jest.clearAllMocks();
