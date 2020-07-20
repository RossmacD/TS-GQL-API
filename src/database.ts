import Knex from 'knex';
// @ts-ignore
import knexfile from '../knexfile';
import { User } from './models/User';

// The knex object is essentially the object that represents the database / connection
// Database config is in the knexfile,
export const knex = Knex({ ...(knexfile as any) });

