import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compress from 'compression';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import http from 'http';
import Redis from 'ioredis';
import logger from 'morgan';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './schemas/UserResolver';

const redis = new Redis(process.env.REDIS_URL);

const createApp = async () => {
  // Our server application will be an instance of express
  const app = express();
  // We load up out schema created by typegraphQL
  const schema = await buildSchema({ resolvers: [UserResolver] });
  // We need to create an apollo server to run our graphQL - the context lets us pass the request into the resolvers
  const apollo = new ApolloServer({ schema, context: ({ req, res }) => ({ req }) });

  // Any normal routes can be set up here, currently there are none
  // const router = express.Router();
  // app.use('/', router);

  // Middleware
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(compress());

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  );

  // Set up redis
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET || 'oauseyfdpoiausdfvk239084672gfgwsd87twd',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 4,
      },
    })
  );

  // Pass on express middleware to apollo
  apollo.applyMiddleware({ app });
  return app;
};

export default createApp;
