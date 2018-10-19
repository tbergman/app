import * as React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@hedviginsurance/brand';
import ProgressImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import styled from '@sampettersson/primitives';

import { Giphy } from 'src/components/icons/Giphy';
import { Spacing } from 'src/components/Spacing';

import { Props } from './types';

const MessageContainer = styled(View)({
  borderRadius: 20,
  overflow: 'hidden',
  marginBottom: 10,
});

const GiphyText = styled(Text)({
  marginTop: 1,
  fontSize: 12,
  fontFamily: 'Helvetica Neue',
  fontWeight: '500',
  color: colors.DARK_GRAY,
});

const PoweredBy = styled(View)({
  borderWidth: 1,
  borderTopWidth: 0,
  borderColor: colors.LIGHT_GRAY,
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  paddingLeft: 15,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
});

const SizedProgressImage = styled(ProgressImage)({
  width: 280,
  height: 200,
});

export const GiphyMessage: React.SFC<Props> = ({ message }) => (
  <MessageContainer>
    <SizedProgressImage
      source={{
        uri: message.body.text,
      }}
      indicator={Progress.CircleSnail}
      indicatorProps={{
        size: 40,
        thickness: 5,
        color: colors.PINK,
      }}
    />
    <PoweredBy>
      <Giphy width={20} height={20} />
      <Spacing width={10} />
      <GiphyText>GIPHY</GiphyText>
    </PoweredBy>
  </MessageContainer>
);
