import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';
import { typeDefs } from './typedefs';
import { getToken, deleteToken } from './context';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema, context: { getToken, deleteToken } }),
});
