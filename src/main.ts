import Database from './database';
import app from './server';

// Connect to database with knex
// Database config is in ../knexfile.js
Database.connect();

// Start the server
const port = process.env.PORT || 3000;

const server = app
  .listen(port, () => {
    console.log(`
  Server running at  \x1b[36mhttp://${process.env.BASE_URL || 'localhost'}:${port}\x1b[0m
  
  GraphQL playground running at \x1b[35mhttp://${process.env.BASE_URL ||
    'localhost'}:${port}/graphql\x1b[0m
  `);
  })
  .on('error', (err:any, req:any) => {
    console.error('Server Error: ', err);
    process.exit();
  });
