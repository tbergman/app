import Config from '@hedviginsurance/react-native-config';
import {
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';
import { buildClientSchema } from 'graphql';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

import giraffeSchema from './external-schemas/giraffe.json';

import { resolvers } from './resolvers';
import { typeDefs } from './typedefs';

import { getToken } from './context';

const uploadLink = createUploadLink({
  uri: Config.GRAPHQL_URL,
});

const setAuthorizationLink = setContext(async () => ({
  headers: { Authorization: await getToken() },
}));

const executableGiraffeSchema = makeRemoteExecutableSchema({
  schema: buildClientSchema(giraffeSchema),
  link: setAuthorizationLink.concat(uploadLink),
});

const executableLocalSchema = makeExecutableSchema({ typeDefs, resolvers });

export const schema = mergeSchemas({
  schemas: [executableLocalSchema, executableGiraffeSchema],
});
