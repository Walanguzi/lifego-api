const supertest = require('supertest');
const express = require('express');
const http = require('http');
const initServer = require('../');

const app = express();
const server = http.Server(app);
const testApp = initServer(app, server);
const agent = supertest.agent(testApp);

describe('GraphQL integration tests', () => {
  test('Should query successfully', (done) => {
    const body = {
      query: 'mutation { explore { bucketlists {name} } }',
    };

    agent.post('/api/graphql')
      .send(body)
      .expect(201)
      .end((error, result) => {
        expect(result.body.data.explore.bucketlists).toHaveLength(0);
        done();
      });
  });
});
