import { AuthenticationError, gql, IResolvers, UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { findUserByEmail, validatePassword } from '../controllers/UserController';
// import db from '../database';
import { User, UsersTbl, usersByProperty } from '../models/User';
import { ApolloContext } from '../types/ApolloContext';

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async users(): Promise<User[]> {
    return UsersTbl().select('*');
  }
  
  @Query(() => User, { nullable: true })
  async getSelf(@Ctx() ctx: ApolloContext) {
    if (!ctx.req.session.userId) throw new AuthenticationError('Session timed out');
    return usersByProperty({ id: ctx.req.session.userId }).first();
  }

  @Mutation(() => User)
  async register(@Arg('email') email: string, @Arg('password') password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    // Insert the new user
    const user = await UsersTbl()
      .insert({ email, password: hash })
      .returning('*')
      .then((newUser) => newUser[0])
      .catch((err) => {
        throw new AuthenticationError(
          'Sorry, it appears an account with that email already exists'
        );
      });
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
      .then((user) => validatePassword(password, user))
      .then((user) => {
        // Attach the users authentication to a cookie
        // console.log(ctx.req)
        ctx.req.session.userId = user.id;
        return user;
      })
      .catch((err) => {
        throw new AuthenticationError(err || 'Incorrect Password');
      });
  }
}
