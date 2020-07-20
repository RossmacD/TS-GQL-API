import { Field, ID, ObjectType } from 'type-graphql';
import { knex } from '../database';

// Describe the User type for both typescript and for apollo server
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  password: string;
}

//
const dbProps = {
  tableName: `users`,
};

// Set up tables
export const UsersTbl = () => knex<User>(dbProps.tableName);

// Select a user by the inputted property/s
export const usersByProperty = (property: Partial<User>) =>
  knex<User>(dbProps.tableName).where(property);
