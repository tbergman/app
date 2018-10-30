import * as React from 'react';
import { PixelRatio, View, StyleSheet } from 'react-native';
import ProgressImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Config from '@hedviginsurance/react-native-config';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';

import { Props } from './types';

const InlineImageContainer = styled(View)(
  ({ withMargin }: { withMargin: boolean }) => ({
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: withMargin ? 10 : 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.LIGHT_GRAY,
  }),
);

const TARGET_IMAGE_WIDTH = 280;
const TARGET_IMAGE_HEIGHT = 200;

const InlineImage = styled(ProgressImage)({
  width: TARGET_IMAGE_WIDTH,
  height: TARGET_IMAGE_HEIGHT,
});

export const ImageMessage: React.SFC<Props> = ({ message, withMargin }) => {
  const IMAGE_WIDTH = PixelRatio.getPixelSizeForLayoutSize(TARGET_IMAGE_WIDTH);
  const IMAGE_HEIGHT = PixelRatio.getPixelSizeForLayoutSize(
    TARGET_IMAGE_HEIGHT,
  );

  return (
    <InlineImageContainer withMargin={withMargin}>
      <InlineImage
        source={{
          uri: `${
            Config.PIG_URL
          }/unsafe/${IMAGE_HEIGHT}x${IMAGE_WIDTH}/smart/${encodeURIComponent(
            message.body.text,
          )}`,
        }}
        indicator={Progress.CircleSnail}
        indicatorProps={{
          size: 40,
          thickness: 3,
          color: colors.PURPLE,
        }}
      />
    </InlineImageContainer>
  );
};
