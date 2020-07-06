[![Coverage Status](https://coveralls.io/repos/github/munala/lifego-api/badge.svg?branch=master)](https://coveralls.io/github/munala/lifego-api?branch=master)
[![CircleCI](https://circleci.com/gh/munala/lifego-api.svg?style=svg)](https://circleci.com/gh/munala/lifego-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/e085e754cbc827558383/maintainability)](https://codeclimate.com/github/munala/lifego-api/maintainability)

## Description
This is an API for bucketlists. It is built using node `express`, `graphql-express` and `graphql-js`.

## Setup
This project relies on `node^8.9`, `mongo^3.4` and `postgres^9.4` to run. Make sure they are installed first.

Run the following commands to setup:

  `git clone https://github.com/munala/lifego-api.git`

  `cd lifego-api/`

  `createdb lifego`

  `createdb lifego_test`

  `npm install`

  `npm install -g sequelize sequelize-cli`

  `sequelize db:migrate`

Add the following environment variables to the shell variables:
  - `EMAIL_SENDER` - Email used by app to send emails.
  - `EMAIL_PASSWORD` - Password for the above email.
  - `DATABASE_URL` - Postgresql database url
  - `MONGODB_URI` - Mongodb uri used by the app.
  - `NODE_ENV` - The environment in which you run the app()
  - `FACEBOOK_CLIENT_ID` - Facebook client id used for social auth.
  - `FACEBOOK_SECRET` - Facebook secret used for social auth.
  - `GOOGLE_CLIENT_ID` - Google client id used for social auth.
  - `GOOGLE_SECRET` - Google secret used for social auth.
  - `SECRET_KEY` - Secret key used to generate auth tokens.
  - `EXPIRES` - Expiry period for tokens in microseconds.
  - `DB_HOST` - Host for the postgres database.
  - `DB_PORT` - Port for the above host used to connect to postgres.
  - `POSTGRES_DB` - Postgres database used by the app.
  - `EMAIL_SCHEDULER_TOKEN` - Token used for scheduling emails.
  - `CLOUDAMQP_URL` - Url for CloudAMQP.
  - `FRONT_END` - Host for frontend app.
  - `DEPLOY_PATH` - Path to deploy script

When using **docker-compose** create `.env` and `.env-dev` files for production and development environments respectively and populate them accordingly with the above variables.

Add the following line to your hosts file `/etc/hosts`:

  `127.0.0.1 postgres`

#### Using docker
Make sure you have docker installed first. Create a file `.env` and add the variables named above.

Run the following command to setup container:

  `docker build -t lifego-api`

  Run the following command to run migrations:

  `docker exec -it $(docker ps | grep lifego-api_web | awk '{ print $1 }') /bin/sh -c './node_modules/.bin/sequelize db:migrate'`

## Running
Run the following commands to run app:

  `mongod` or `sudo mongod` if you encounter permission issues.

  `gulp dev`

#### Using docker-compose
Run the following command to launch the app:

  `docker-compose up <service>`

or

  `docker-compose up --build <service>` to build first before running.

Replace `<service>` with `lifego-api-dev` for development or `lifego-api-prod` for production.

Run the following command to stop:

  `docker-compose down`

## Testing
Run the following commands to test app:

#### Using gulp
  `gulp test`

#### Using npm scripts
  `npm test`

#### Generating coverage report
  `npm run coverage`

## Load testing
#### Setup
On mac you can run,

  `brew tap loadimpact/k6`

  `brew install k6`

If you are on another platform, download the binary from [here][58286273].

  [58286273]: https://github.com/loadimpact/k6/releases "Setup"

#### Running
Run `npm run load-test-dev` to test development.
Run `npm run load-test-prod` to test production.

## Api documentation
[Click here][58286272]

  [58286272]: https://github.com/munala/lifego-api/blob/master/docs/endpoints.md "Api Documentaion"
