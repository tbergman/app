import React from 'react';
import PropTypes from 'prop-types';
import { Svg, Circle, G, Polygon } from 'react-native-svg';

import { colors } from '@hedviginsurance/brand';

export const CircledCheckmark = ({
  height,
  width,
  checkmarkFillColor,
  circleStrokeColor,
}) => (
  <Svg height={height} width={width} version="1.1" viewBox="0 0 37 37">
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

CircledCheckmark.defaultProps = {
  checkmarkFillColor: colors.GREEN,
  circleStrokeColor: colors.GREEN,
};

CircledCheckmark.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  checkmarkFillColor: PropTypes.oneOf(Object.values(colors)),
  circleStrokeColor: PropTypes.oneOf(Object.values(colors)),
};
