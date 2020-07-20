import { ApolloContext } from '../types/ApolloContext';
import { AuthenticationError } from 'apollo-server';
import { MiddlewareFn } from 'type-graphql';

export const authCheck: MiddlewareFn<ApolloContext> = ({ context }, next) => {
  if (!!context.req.session.userId) {
    return next();
  } else {
    throw new AuthenticationError('Session timed out');
  }
};
