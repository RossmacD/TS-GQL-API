import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compress from 'compression';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import logger from 'morgan';
import { buildSchema } from 'type-graphql';
// import rawSchema from './schemas';
import { UserResolver } from './schemas/UserResolver';

const createApp = async () => {
  // Our server application will be an instance of express
  const app = express();
  // We load up out schema created by typegraphQL
  const schema = await buildSchema({ resolvers: [UserResolver] });
  // We need to create an apollo server to run our graphQL
  const apollo = new ApolloServer({ schema });

  // Middleware
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(compress());

  // Pass on express middleware to apollo
  apollo.applyMiddleware({ app });
  return app;
};

export default createApp;
// Creates and configures an ExpressJS web server.
// class Server {
//   app: express.Application;
//   server: http.Server;
//   apollo: ApolloServer;

//   constructor() {
//     this.app = express();
//     this.apollo = new ApolloServer({ schema });
//     this.middleware();
//     this.routes();
//   }

//   middleware() {
//     this.app.use(logger('dev'));
//     this.app.use(bodyParser.json());
//     this.app.use(bodyParser.urlencoded({ extended: true }));

//     this.apollo.applyMiddleware({
//       app: this.app,
//     });
//   }

//   routes() {
//     /* This is just to get up and running, and to make sure what we've got is
//      * working so far. This function will change when we start to add more
//      * API endpoints */
//     const router = express.Router();

//     this.app.use('/', router);
//   }

//   start(cb = () => null) {
//     const port = process.env.PORT || 3000;

//     this.server = this.app.listen(port, () => {
//       // if (err) {
//       //   throw err;
//       // }
//       // tslint:disable-next-line
//       console.log(`Server running on port ${port}`); // eslint-disable-line
//       cb();
//     });
//   }

//   stop(cb = () => null) {
//     if (this.server) {
//       this.server.close(cb);
//     }
//   }
// }

