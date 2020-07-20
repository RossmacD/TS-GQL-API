// const parse = require('connection-string');
const _ = require('lodash');
require('dotenv').config();

// const connection = parse(process.env.DATABASE_URL);

const defaults = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: `${__dirname}/db/migrations`,
  },
  seeds: {
    directory: `${__dirname}/db/seeds`,
  },
  debug: false,
};

const environments = {
  production: {
    pool: {
      min: 2,
      max: 10,
    },
  },
};

// console.log(defaults)

const config = _.merge(defaults, environments[process.env.NODE_ENV]);

module.exports = config;
