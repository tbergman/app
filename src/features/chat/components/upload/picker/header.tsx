import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { Spacing } from 'src/components/Spacing';
import { UploadMutation } from './upload-mutation';
import { UploadingAnimation } from './uploading-animation';
import { ImageLibrary } from 'src/components/icons/ImageLibrary';

const HeaderContainer = styled(View)({
  padding: 10,
  paddingRight: 0,
  flexDirection: 'column',
});

const PickerButton = styled(TouchableOpacity)({
  width: 110,
  height: 110,
  backgroundColor: colors.DARK_GRAY,
  borderRadius: 10,
});

const options = {};

interface HeaderProps {
  onUpload: (url: string) => void;
}

export const Header: React.SFC<HeaderProps> = ({ onUpload }) => (
  <HeaderContainer>
    <PickerButton />
    <Spacing height={10} />
    <UploadMutation>
      {(upload, isUploading) => (
        <PickerButton
          onPress={() => {
            ImagePicker.launchImageLibrary(options, (response) => {
              if (response.origURL) {
                upload(response.origURL).then((uploadResponse) => {
                  if (uploadResponse instanceof Error) {
                  } else {
                    onUpload(uploadResponse.url);
                  }
                });
              }
            });
          }}
        >
          <UploadingAnimation isUploading={isUploading}>
            <ImageLibrary width={16} height={16} />
          </UploadingAnimation>
        </PickerButton>
      )}
    </UploadMutation>
  </HeaderContainer>
);
