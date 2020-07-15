import { gql } from 'apollo-server';
import db from '../database';

export const typeDef = gql`
    extend type Query {
        user(id:String):User
        users(limit):[User]
    }

    extend type Mutation {
        register(username:String!,password:String!):User

    }

    type User{
        id:ID!
        username:String!
    }
`;

export const resolvers = {
  Query: {
    user(root, { id = '' }) {
      return db
        .query('books')
        .where({ id })
        .first();
    },
  },
};
