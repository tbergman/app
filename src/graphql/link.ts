import Config from '@hedviginsurance/react-native-config';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

import { getToken } from './context';

const uploadLink = createUploadLink({
  uri: Config.GRAPHQL_URL,
});

const setAuthorizationLink = setContext(async () => ({
  headers: { Authorization: await getToken() },
}));

export const link = setAuthorizationLink.concat(uploadLink);
