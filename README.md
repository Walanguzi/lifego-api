[![Coverage Status](https://coveralls.io/repos/github/munala/lifego-api/badge.svg?branch=master)](https://coveralls.io/github/munala/lifego-api?branch=master)
[![CircleCI](https://circleci.com/gh/munala/lifego-api.svg?style=svg)](https://circleci.com/gh/munala/lifego-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/e085e754cbc827558383/maintainability)](https://codeclimate.com/github/munala/lifego-api/maintainability)

## Description
This is an API for bucketlists. It is built using node `express`, `graphql-express` and `graphql-js`.

## Setup
This project relies on `node^8.9`, `mongo^3.4` and `postgres^9.4` to run. Make sure they are installed first.

Run the following commands to setup:

`$ git clone https://github.com/munala/lifego-api.git`

`$ cd lifego-api/`

`$ createdb lifego`

`$ createdb lifego_test`

`$ npm install`

`$ npm install -g sequelize sequelize-cli`

`$ sequelize db:migrate`

## Running
Run the following commands to run app:

`$ mongod` or `$ sudo mongod` if you encounter permission issues.

`$ gulp`

## Testing
Run the following commands to test app:

#### Using gulp
`$ gulp test`

#### Using npm scripts
`$ npm test`

#### Generating coverage report
`$ npm run coverage`
