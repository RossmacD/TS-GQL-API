import { gql, IResolvers } from 'apollo-server';
import bcrypt from 'bcrypt';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import db from '../database';
import { User } from '../models/User';

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Mutation(() => User)
  async register(@Arg('email') email: string, @Arg('password') password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    const [user] = await db
      .query('users')
      .insert({ email, password: hash })
      .returning('*');
    return user;
  }
}

// export const typeDef = gql`
//   extend type Query {
//     user(id: String): User
//     users(limit: Int): [User]
//   }

//   extend type Mutation {
//     register(username: String!, email: String!, password: String!): User
//     login(email: String!, password: String!): User
//   }

//   type User {
//     id: ID!
//     username: String!
//     email: String!
//     password: String!
//   }
// `;

// export const resolvers: IResolvers = {
//   Query: {
//     user(root, { id = '' }) {
//       return db
//         .query('users')
//         .where({ id })
//         .first();
//     },
//     users(root, { limit = '' }) {
//       return db.query('users').limit(limit);
//     },
//   },
//   Mutation: {
//     async register(root, { username, email, password }) {
//       // Hash the password for security
//       const hash = await bcrypt.hash(password, 10);
//       // Put into user with hashed password into database
//       const [user] = await db
//         .query('users')
//         .insert({ username, email, password: hash })
//         .returning('*');
//       return user;
//     },
//     async login(root, { email, password }) {
//       // Get user
//       const user = await db
//         .query('users')
//         .where({ email })
//         .first();
//       if (!user) {
//         return null;
//       }
//       // Check password against hash
//       const valid = await bcrypt.compare(password, user.password);
//       if (valid) {
//         return user;
//       }
//       return null;
//     },
//   },
// };
