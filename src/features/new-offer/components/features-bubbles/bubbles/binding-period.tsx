import * as React from 'react';
import { colors } from '@hedviginsurance/brand';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';
import { Spacing } from 'src/components/Spacing';

import { Title } from './common/title';
import { Subtitle } from './common/subtitle';

const BINDING_PERIOD_TITLE = 'Bindningstid';
const BINDING_PERIOD_SUBTITLE = 'Nope, så jobbar inte Hedvig';

export const BindingPeriod = () => (
  <BubbleAnimation delay={50}>
    <Bubble width={135} height={135} backgroundColor={colors.PINK}>
      <Title>{BINDING_PERIOD_TITLE}</Title>
      <Spacing height={2.5} />
      <Subtitle>{BINDING_PERIOD_SUBTITLE}</Subtitle>
    </Bubble>
  </BubbleAnimation>
);
