import { buildSchema } from 'type-graphql';
import * as Author from './author';
import * as Book from './book';
import { UserResolver } from './UserResolver';

// export default [Author, Book, User];

export default [UserResolver];
