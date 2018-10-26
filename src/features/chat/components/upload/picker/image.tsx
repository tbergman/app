import * as React from 'react';
import { TouchableWithoutFeedback, View, Image as RNImage } from 'react-native';
import styled from '@sampettersson/primitives';

import { UploadMutation } from './upload-mutation';
import { Presend } from './presend';

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
    {(uploadFile, isUploading) => (
      <Padding>
        <BorderRadius>
          <Presend
            isUploading={isUploading}
            onPressSend={() => {
              uploadFile(uri).then((response) => {
                if (response instanceof Error) {
                } else {
                  onUpload(response.url);
                }
              });
            }}
          >
            {(showPresendOverlay) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  showPresendOverlay();
                }}
              >
                <ImageContainer source={{ uri }} />
              </TouchableWithoutFeedback>
            )}
          </Presend>
        </BorderRadius>
      </Padding>
    )}
  </UploadMutation>
);
