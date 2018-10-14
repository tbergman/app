import * as React from 'react';
import { Image as RNImage, TouchableWithoutFeedback } from 'react-native';
import styled from '@sampettersson/primitives';

import { UploadMutation } from './upload-mutation';

const ImageContainer = styled(RNImage)({
  height: 300,
  width: 250,
  marginRight: 2,
});

interface ImageProps {
  uri: string;
  onUpload: (url: string) => void;
}

export const Image: React.SFC<ImageProps> = ({ uri, onUpload }) => (
  <UploadMutation>
    {(uploadFile) => (
      <TouchableWithoutFeedback
        onPress={() =>
          uploadFile(uri).then((response) => {
            if (response) {
              onUpload(response.url!);
            }
          })
        }
      >
        <ImageContainer source={{ uri }} />
      </TouchableWithoutFeedback>
    )}
  </UploadMutation>
);
