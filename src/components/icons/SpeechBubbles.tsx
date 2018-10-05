import * as React from 'react';
import { Svg, G, Path } from 'react-native-svg';
import { colors } from '@hedviginsurance/brand';

import { IconSize } from './types';

interface SpeechBubblesProps extends IconSize {
  fill?: string;
}

export const SpeechBubbles: React.SFC<SpeechBubblesProps> = ({
  width,
  height,
  fill = colors.WHITE,
}) => (
  <Svg height={height} width={width} viewBox="0 0 618.467 618.467">
    <G>
      <Path
        d="M602.3,12.573C593.956,4.398,583.627,0,571.774,0H173.109c-24.419,0-44.171,18.68-44.171,43.099v84.045h40.586V43.099    c0-2.513,1.072-3.593,3.585-3.593h398.666c2.513,0,3.594,1.08,3.594,3.593v286.967c0,2.514-1.081,3.594-3.594,3.594h-54.232    v39.865h54.232c11.853,0,22.182-4.397,30.525-12.573c8.535-8.352,12.934-18.672,12.934-30.886V43.099    C615.233,30.886,610.835,20.925,602.3,12.573z"
        fill={fill}
      />
      <Path
        d="M445.35,169.163H46.693c-12.213,0-22.634,4.306-30.894,12.934c-8.26,8.612-12.566,19.033-12.566,31.238V499.95    c0,11.853,4.214,22.35,12.566,30.886c8.175,8.352,18.68,12.565,30.894,12.565h180.288l135.044,75.065v-75.065h83.324    c12.214,0,22.719-4.214,30.886-12.565c8.353-8.536,12.574-19.033,12.574-30.886V213.335c0-12.213-4.314-22.626-12.574-31.246    C467.977,173.469,457.563,169.163,445.35,169.163z M448.943,499.95c0,2.513-1.08,3.586-3.594,3.586h-83.324H322.52v39.865v7.547    l-75.778-42.738l-8.98-4.674h-10.781H46.693c-2.521,0-3.594-1.073-3.594-3.586V213.335c0-3.233,1.073-4.666,3.594-4.666H445.35    c2.514,0,3.594,1.44,3.594,4.666V499.95z"
        fill={fill}
      />
      <Path
        d="M368.852,380.705H225.548c-11.133,0-20.113,8.98-20.113,20.113s8.98,19.753,20.113,19.753h143.303    c11.134,0,19.753-8.62,19.753-19.753S379.985,380.705,368.852,380.705z"
        fill={fill}
      />
      <Path
        d="M368.852,292.714H123.191c-11.133,0-19.753,8.62-19.753,19.753s8.62,19.753,19.753,19.753h245.661    c11.134,0,19.753-8.62,19.753-19.753S379.985,292.714,368.852,292.714z"
        fill={fill}
      />
    </G>
  </Svg>
);