import {
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import { buildClientSchema } from 'graphql';

import translationSchema from './external-schemas/translations.json';

import { resolvers } from './resolvers';
import { typeDefs } from './typedefs';

const translationsLink = new HttpLink({
  uri: 'https://api-euwest.graphcms.com/v1/cjmawd9hw036a01cuzmjhplka/master',
  fetch,
});

const executableTranslationsSchema = makeRemoteExecutableSchema({
  schema: buildClientSchema(translationSchema),
  link: translationsLink,
});

const executableLocalSchema = makeExecutableSchema({ typeDefs, resolvers });

export const schema = mergeSchemas({
  schemas: [executableTranslationsSchema, executableLocalSchema],
});
