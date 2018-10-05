import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';

import { getToken, deleteToken } from './context';
import { schema } from './schema';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema, context: { getToken, deleteToken } }),
});
