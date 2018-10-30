import * as React from 'react';
import { Svg, G, Path } from 'react-native-svg';

import { IconSize } from './types';

export const File: React.SFC<IconSize> = ({ width, height }) => (
  <Svg height={height} width={width} viewBox="0 0 66 66">
    <G>
      <Path
        d="M40.5,5.8C39.3,4.6,37.7,4,36,4H21c-5.8,0-10.5,4.7-10.5,10.5v37C10.5,57.3,15.2,62,21,62h24c5.8,0,10.5-4.7,10.5-10.5   V22.7c0-1.8-0.7-3.5-2-4.7L40.5,5.8z M50.5,51.5c0,3-2.5,5.5-5.5,5.5H21c-3,0-5.5-2.5-5.5-5.5v-37c0-3,2.5-5.5,5.5-5.5h14.1v8   c0,3.6,2.9,6.5,6.5,6.5h8.9V51.5z"
        fill="#fff"
      />
    </G>
  </Svg>
);
