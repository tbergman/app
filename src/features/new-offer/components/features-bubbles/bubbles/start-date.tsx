import * as React from 'react';
import { colors } from '@hedviginsurance/brand';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';
import { Spacing } from 'src/components/Spacing';

import { Title } from './common/title';
import { Subtitle } from './common/subtitle';

const START_DATE_TITLE = 'Startdatum';
const START_DATE_SUBTITLE = 'Så fort din bindningstid går ut';

export const StartDate = () => (
  <BubbleAnimation delay={0}>
    <Bubble width={130} height={130} backgroundColor={colors.GREEN}>
      <Title>{START_DATE_TITLE}</Title>
      <Spacing height={2.5} />
      <Subtitle>{START_DATE_SUBTITLE}</Subtitle>
    </Bubble>
  </BubbleAnimation>
);
