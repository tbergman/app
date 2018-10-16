import * as React from 'react';
import { TouchableWithoutFeedback, View, Image as RNImage } from 'react-native';
import styled from '@sampettersson/primitives';

import { UploadMutation } from './upload-mutation';

const Padding = styled(View)({
  padding: 10,
  paddingRight: 0,
  height: 250,
  width: 250,
});

const BorderRadius = styled(View)({
  borderRadius: 10,
  overflow: 'hidden',
});

const ImageContainer = styled(RNImage)({
  height: '100%',
  width: '100%',
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
        <Padding>
          <BorderRadius>
            <ImageContainer source={{ uri }} />
          </BorderRadius>
        </Padding>
      </TouchableWithoutFeedback>
    )}
  </UploadMutation>
);
