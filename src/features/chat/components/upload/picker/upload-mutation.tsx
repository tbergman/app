import * as React from 'react';
import { View } from 'react-native';
import { Mutation, MutationFunc } from 'react-apollo';
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';
import fs from 'react-native-fs';
import styled from '@sampettersson/primitives';
import path from 'path';
import mime from 'mime-types';
import url from 'url';
import { Container, ActionMap } from 'constate';

import { UploadLoader } from './upload-loader';

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

interface State {
  isUploading: boolean;
}

interface Actions {
  setIsUploading: (isUploading: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setIsUploading: (isUploading) => () => ({
    isUploading,
  }),
};

interface UploadResponse {
  uploadFile: {
    signedUrl: string | null;
  };
}

interface UploadMutationProps {
  children: (
    uploadFile: (uri: string) => Promise<{ url: string } | Error>,
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

const uploadHandler = (
  mutate: MutationFunc<UploadResponse>,
  setIsUploading: ((isUploading: boolean) => void),
  isUploading: boolean,
) => async (uri: string) => {
  if (isUploading) return new Error('Already uploading');

  setIsUploading(true);

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

  setIsUploading(false);

  if (response && response.data) {
    return {
      url: response.data!.uploadFile.signedUrl,
    };
  }

  return new Error("File couldn't be uploaded");
};

export const UploadMutation: React.SFC<UploadMutationProps> = ({
  children,
}) => (
  <Container actions={actions} initialState={{ isUploading: false }}>
    {({ isUploading, setIsUploading }) => (
      <Mutation mutation={UPLOAD_MUTATION}>
        {(mutate) => (
          <UploadMutationContainer>
            {children(uploadHandler(mutate, setIsUploading, isUploading))}
            {isUploading && <UploadLoader />}
          </UploadMutationContainer>
        )}
      </Mutation>
    )}
  </Container>
);
