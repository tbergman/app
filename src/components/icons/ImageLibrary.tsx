import * as React from 'react';
import { Svg, Rect } from 'react-native-svg';

import { IconSize } from './types';

interface ImageLibraryProps extends IconSize {
  fill?: string;
}

export const ImageLibrary: React.SFC<ImageLibraryProps> = ({
  width,
  height,
  fill = '#414150',
}) => (
  <Svg width={width} height={height} viewBox="0 0 16 16">
    <Rect width="4" height="4" rx="1" fill={fill} />
    <Rect y="6" width="4" height="4" rx="1" fill={fill} />
    <Rect x="6" width="4" height="4" rx="1" fill={fill} />
    <Rect x="6" y="6" width="4" height="4" rx="1" fill={fill} />
    <Rect x="12" width="4" height="4" rx="1" fill={fill} />
    <Rect x="12" y="6" width="4" height="4" rx="1" fill={fill} />
    <Rect y="12" width="4" height="4" rx="1" fill={fill} />
    <Rect x="6" y="12" width="4" height="4" rx="1" fill={fill} />
    <Rect x="12" y="12" width="4" height="4" rx="1" fill={fill} />
  </Svg>
);
