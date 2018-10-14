import * as React from 'react';
import { View } from 'react-native';
import { Mutation, MutationFunc } from 'react-apollo';
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';
import fs from 'react-native-fs';
import { UploadLoader } from './upload-loader';
import styled from '@sampettersson/primitives';

const UploadMutationContainer = styled(View)({
  position: 'relative',
});

const UPLOAD_MUTATION = gql`
  mutation UploadMutation($file: Upload!) {
    uploadFile(file: $file) @uploadLink {
      url
    }
  }
`;

interface UploadResponse {
  uploadFile: {
    url: string | null;
  };
}

interface UploadMutationProps {
  children: (
    uploadFile: (uri: string) => Promise<{ url: string | null }>,
  ) => React.ReactNode;
}

const uploadHandler = (mutate: MutationFunc<UploadResponse>) => async (
  uri: string,
) => {
  const result = await fs.copyAssetsFileIOS(
    uri,
    `${fs.DocumentDirectoryPath}/hedvig-upload-file.jpg`,
    0,
    0,
  );

  const file = new ReactNativeFile({
    uri: `${result}`,
    name: 'hedvig-upload-file.jpg',
    type: 'image/jpg',
  });

  const response = await mutate({
    variables: {
      file,
    },
  });

  if (response && response.data) {
    return {
      url: response.data!.uploadFile.url,
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
