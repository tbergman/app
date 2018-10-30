import * as React from 'react';
import { Svg, Circle, G, Polygon } from 'react-native-svg';

import { colors } from '@hedviginsurance/brand';
import { IconSize } from './types';

interface CircledCheckmarkProps extends IconSize {
  checkmarkFillColor?: string;
  circleStrokeColor?: string;
}

export const CircledCheckmark: React.SFC<CircledCheckmarkProps> = ({
  height,
  width,
  checkmarkFillColor = colors.GREEN,
  circleStrokeColor = colors.GREEN,
}) => (
  <Svg height={height} width={width} viewBox="0 0 37 37">
    <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <G transform="translate(1.000000, 1.000000)">
        <G
          id="checkmark_white"
          fill={checkmarkFillColor}
          fillRule="nonzero"
          transform="translate(10.000000, 12.000000)"
        >
          <Polygon
            id="Path-5"
            points="0.627843871 6.04286007 0 6.69859136 5.06239984 12 15 0.625956924 14.3449587 0 5.03390001 10.6569373"
          />
        </G>
        <Circle
          id="Oval"
          x="17.5"
          y="17.5"
          r="17.5"
          stroke={circleStrokeColor}
        />
      </G>
    </G>
  </Svg>
);
