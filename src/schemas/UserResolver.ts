import { AuthenticationError, gql, IResolvers, UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { findUserByEmail, validatePassword } from '../controllers/UserController';
import db from '../database';
import { User } from '../models/User';
import { ApolloContext } from '../types/ApolloContext';

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async users() {
    return db.query('users');
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

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: ApolloContext
  ): Promise<User | null> {
    // Get user, check the password matches the saved hash, then return the user with an authentication cookie
    return await findUserByEmail(email)
      .then(user => validatePassword(password, user))
      .then(user => {
        // Attach the users authentication to a cookie
        ctx.req.session.userId = user.id;
        return user;
      })
      .catch(error => {
        throw new AuthenticationError(error || 'Incorrect Password');
      });
  }
}
