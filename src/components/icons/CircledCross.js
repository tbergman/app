import React from 'react';
import PropTypes from 'prop-types';
import { Svg, Circle, G, Polygon } from 'react-native-svg';

import { colors } from '../../style';

export const CircledCross = ({
  width,
  height,
  crossFillColor,
  circleStrokeColor,
}) => (
  <Svg height={height} width={width} version="1.1" viewBox="0 0 37 37">
    <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <G transform="translate(1.000000, 1.000000)">
        <Circle x="17.5" y="17.5" r="17.5" stroke={circleStrokeColor} />
        <G
          fill={crossFillColor}
          fillRule="nonzero"
          transform="translate(3.000000, 3.000000)"
        >
          <Polygon
            points="14.6421356 13.6421356 14.6421356 4.14213562 13.6421356 4.14213562 13.6421356 13.6421356 4.14213562 13.6421356 4.14213562 14.6421356 13.6421356 14.6421356 13.6421356 24.1421356 14.6421356 24.1421356 14.6421356 14.6421356 24.1421356 14.6421356 24.1421356 13.6421356"
            transform="translate(14.142136, 14.142136) rotate(45.000000) translate(-14.142136, -14.142136) "
          />
        </G>
      </G>
    </G>
  </Svg>
);

CircledCross.defaultProps = {
  crossFillColor: colors.PINK,
  circleStrokeColor: colors.PINK,
};

CircledCross.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  crossFillColor: PropTypes.oneOf(Object.values(colors)),
  circleStrokeColor: PropTypes.oneOf(Object.values(colors)),
};
