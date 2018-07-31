const supertest = require('supertest');
const express = require('express');
const http = require('http');
const initServer = require('../');

const app = express();
const server = http.Server(app);
const testApp = initServer(app, server);
const agent = supertest.agent(testApp);

const { getModel } = require('../lib/utils');

const User = getModel('users');

describe('Auth integration tests', () => {
  test('Should register successfully', (done) => {
    const user = {
      displayName: 'test user',
      email: 'test@user.com',
      password: 'password',
    };

    agent.post('/api/auth/register')
      .send(user)
      .expect(201)
      .end((error, result) => {
        expect(result.body.message).toEqual('Successfully registered');
        done();
      });
  });

  afterEach(async (done) => {
    await User.destroy({ truncate: true, cascade: true });
    done();
  });
});
