import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { colors } from '@hedviginsurance/brand';

import { IconSize } from './types';

interface CircledExclamationMarkProps extends IconSize {
  ovalFill?: string;
  exclamationMarkFill?: string;
}

export const CircledExclamationMark: React.SFC<CircledExclamationMarkProps> = ({
  width,
  height,
  ovalFill = colors.PINK,
  exclamationMarkFill = colors.WHITE,
}) => (
  <Svg width={width} height={height} viewBox="0 0 32 32">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
      fill={ovalFill}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.4037 6.98401H14.5717L15.1957 19.128H16.8037L17.4037 6.98401ZM14.4277 22.56C14.4277 23.424 15.1237 24.12 15.9877 24.12C16.8517 24.12 17.5717 23.424 17.5717 22.56C17.5717 21.696 16.8517 20.976 15.9877 20.976C15.1237 20.976 14.4277 21.696 14.4277 22.56Z"
      fill={exclamationMarkFill}
    />
  </Svg>
);
