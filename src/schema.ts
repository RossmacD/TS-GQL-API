import { gql, makeExecutableSchema } from 'apollo-server';
import schemas from './schemas';

// Any general info can be put here such as api version no. and so on
const BaseQuery = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

// Combine all graphQL typedefs and resolvers then convert to schema for apollo
const executableSchema = Object.values(schemas).reduce(
  (builder, schema) => {
    builder.typeDefs = [...builder.typeDefs, schema.typeDef];
    builder.resolvers = [...builder.resolvers, schema.resolvers];
    return builder;
  },
  {
    typeDefs: [BaseQuery],
    resolvers: [],
  }
);


export default makeExecutableSchema(executableSchema);
// export default fullSchema
