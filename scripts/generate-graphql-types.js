/* eslint-disable no-console */
const graphqlSchemaTypescript = require('graphql-schema-typescript');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('../src/graphql/typedefs');

graphqlSchemaTypescript
  .generateTypeScriptTypes(
    makeExecutableSchema({ typeDefs }),
    './src/graphql/types.ts',
    { typePrefix: '', asyncResult: true },
  )
  .then(() => {
    console.log('Success');
  })
  .catch(console.error);
