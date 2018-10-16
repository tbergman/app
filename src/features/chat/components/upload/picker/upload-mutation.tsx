import * as React from 'react';
import { View } from 'react-native';
import { Mutation, MutationFunc } from 'react-apollo';
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';
import fs from 'react-native-fs';
import { UploadLoader } from './upload-loader';
import styled from '@sampettersson/primitives';
import path from 'path';
import mime from 'mime-types';
import url from 'url';

const UploadMutationContainer = styled(View)({
  position: 'relative',
});

const UPLOAD_MUTATION = gql`
  mutation UploadMutation($file: Upload!) {
    uploadFile(file: $file) @uploadLink {
      signedUrl
    }
  }
`;

interface UploadResponse {
  uploadFile: {
    signedUrl: string | null;
  };
}

interface UploadMutationProps {
  children: (
    uploadFile: (uri: string) => Promise<{ url: string | null }>,
  ) => React.ReactNode;
}

const getRealURI = async (uri: string, filename: string) => {
  if (!uri.includes('assets-library')) {
    return uri;
  }

  return await fs.copyAssetsFileIOS(
    uri,
    `${fs.DocumentDirectoryPath}/${filename}`,
    0,
    0,
  );
};

const uploadHandler = (mutate: MutationFunc<UploadResponse>) => async (
  uri: string,
) => {
  const filename = path.basename(url.parse(uri).pathname || '');
  const realURI = await getRealURI(uri, filename);

  const file = new ReactNativeFile({
    uri: realURI,
    name: filename.toLowerCase(),
    type: mime.lookup(filename) || '',
  });

  const response = await mutate({
    variables: {
      file,
    },
  });

  if (response && response.data) {
    return {
      url: response.data!.uploadFile.signedUrl,
    };
  }

  return {
    url: null,
  };
};

export const UploadMutation: React.SFC<UploadMutationProps> = ({
  children,
}) => (
  <Mutation mutation={UPLOAD_MUTATION}>
    {(mutate, { loading }) => (
      <UploadMutationContainer>
        {children(uploadHandler(mutate))}
        {loading && <UploadLoader />}
      </UploadMutationContainer>
    )}
  </Mutation>
);
