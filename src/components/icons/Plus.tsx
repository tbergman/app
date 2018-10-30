import * as React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';
import { IconSize } from './types';

export const Plus: React.SFC<IconSize> = ({ width, height }) => (
  <Svg width={width} height={height} viewBox="0 0 40 40">
    <Rect x="19" y="11" width="2" height="18" fill="white" />
    <Rect x="11" y="19" width="18" height="2" fill="white" />
  </Svg>
);
