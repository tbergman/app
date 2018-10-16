import * as React from 'react';
import { Svg, Rect, Path } from 'react-native-svg';

import { IconSize } from './types';

export const Giphy: React.SFC<IconSize> = ({ width, height }) => (
  <Svg width={width} height={height} viewBox="0 0 38 48">
    <Rect y="4" width="5" height="40" fill="#2AFC9C" />
    <Rect x="33" y="13" width="5" height="31" fill="#9740FA" />
    <Rect x="33" y="15" width="5" height="5" fill="#4A1F7C" />
    <Rect y="43" width="38" height="5" fill="#22CDFB" />
    <Rect width="25" height="5" fill="#FFF39F" />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23 0H28V5H33V10H38V15H23V0Z"
      fill="#FB6769"
    />
  </Svg>
);
