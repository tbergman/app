import {
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';
import { buildClientSchema } from 'graphql';
import { createUploadLink } from 'apollo-upload-client';

import giraffeSchema from './external-schemas/giraffe.json';

import { resolvers } from './resolvers';
import { typeDefs } from './typedefs';

const uploadLink = createUploadLink({
  uri: 'http://10.0.1.13.xip.io:4000/graphql',
});

const executableGiraffeSchema = makeRemoteExecutableSchema({
  schema: buildClientSchema(giraffeSchema),
  link: uploadLink,
});

const executableLocalSchema = makeExecutableSchema({ typeDefs, resolvers });

export const schema = mergeSchemas({
  schemas: [executableLocalSchema, executableGiraffeSchema],
});
