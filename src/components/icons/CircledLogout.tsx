import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { colors } from '@hedviginsurance/brand';

interface IconSize {
  width: number;
  height: number;
}

interface CircledLogoutProps extends IconSize {
  ovalFill?: string;
}

export const CircledLogout: React.SFC<CircledLogoutProps> = ({
  ovalFill = colors.OFF_WHITE,
  width,
  height,
}) => (
  <Svg height={height} width={width} viewBox="0 0 40 40">
    <Path
      d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
      fill={ovalFill}
      fillRule="evenodd"
    />
    <Path
      d="M26 31V33H14.7245C12.6613 33 11 31.2931 11 29.2017V10.7983C11 8.70488 12.6605 7 14.7245 7H26V9H14.7245C13.777 9 13 9.79781 13 10.7983V29.2017C13 30.2005 13.7781 31 14.7245 31H26Z"
      fill="#AA0045"
    />
    <Path
      d="M24.2601 15.1726L25.7399 13.8271L31.3515 19.9991L25.74 26.1725L24.26 24.8272L28.6485 19.9992L24.2601 15.1726Z"
      fill="#FF8A80"
    />
    <Path d="M30 19V21H19V19H30Z" fill="#FF8A80" />
  </Svg>
);
