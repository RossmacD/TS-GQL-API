<div align="center">
  <h1> Typescript GraphQl API Server</h1>

  <p>Apollo Server, GraphQL, Typescript and Postgres.</p>
</div>

## Getting Started

1. Download & Install Dependencies
    ```sh
    # clone it
    $ git clone 
    $ cd apollo-typescript-starter

    # Make it your own
    $ rm -rf .git && git init

    # Install dependencies
    $ npm install
    ```

1. Next, ensure your local Postgres database is up and running. Once configured, place your connection url in a `.env` file at the root of the repo. These variables will be automatically assigned to process.env when the application boots through [dotenv](https://github.com/motdotla/dotenv). Your .env file should look something like this:

    ```
    DATABASE_URL=postgres://user@host/database
    ```

2. Use knex to migrate the database using the migrations

    ```sh
    # Install knex globally if you don't already have it with 'npm install -g knex' 
    $ knex migrate:latest

    # Use knex migrate:rollback to  
    ```

3. Boot the app and navigate to localhost:3000/graphiql to run a query!

    ```sh
    $ npm start
    ```

## Resources
- [Apollo Server](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)
