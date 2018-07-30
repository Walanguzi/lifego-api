const http = require('http');
const express = require('express');

const testApp = express();
const testServer = http.Server(testApp);
const server = require('..');

describe('server tests', () => {
  test('sets up app', () => {
    const app = {
      use: jest.fn(),
      get: jest.fn(),
    };

    server(app, testServer);

    expect(app.use).toHaveBeenCalled();

    app.use.mockClear();

    process.env.NODE_ENV = 'development';

    server(app, testServer);

    expect(app.use).toHaveBeenCalled();
  });
});
