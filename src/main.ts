import Knex from 'knex';
import knexfile from '../knexfile';
import app from './server';
import Database from './database';

// Connect to database with knex
// Database config is in knexfile.js
Database.connect();

// Start the server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running at  http://${process.env.BASE_URL || 'localhost'}:${port}`);
  console.log(
    `GraphQL playground running at http://${process.env.BASE_URL || 'localhost'}:${port}/graphql`
  );
});
