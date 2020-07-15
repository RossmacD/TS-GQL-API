// This has to be imported for typegraphQL
import 'reflect-metadata';
import Database from './database';
import createApp from './server';
const port = process.env.PORT || 3000;
const baseURL= process.env.BASE_URL || 'localhost';

/**
 *  Start the app asynchronously to allow us to use await
 */
const start = async () => {
  // Connect to database with knex
  // Database config is in ../knexfile.js
  Database.connect();
  const app = await createApp();
  // Start the server
  app
    .listen(port, () => {
      console.log(`
  Server running at  \x1b[36mhttp://${baseURL}:${port}\x1b[0m
  
  GraphQL playground running at \x1b[35mhttp://${baseURL}:${port}/graphql\x1b[0m 
  `);
    })
    .on('error', (err: any, req: any) => {
      console.error('Server Error: ', err);
      process.exit();
    });
};

start();
