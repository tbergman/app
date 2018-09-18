import * as React from 'react';
import { Svg, Path } from 'react-native-svg';

import { IconSize } from './types';

interface CheckmarkProps extends IconSize {
  checkmarkFillColor: string;
}

export const Checkmark: React.SFC<CheckmarkProps> = ({
  height,
  width,
  checkmarkFillColor,
}) => (
  <Svg height={height} width={width} viewBox="0 0 12 10">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.03859 7.76813L1.27203 4.97051L0.333252 5.91982L4.03859 9.66675L11.9999 1.61606L11.0611 0.666748L4.03859 7.76813Z"
      fill={checkmarkFillColor}
    />
  </Svg>
);
