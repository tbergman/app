import * as React from 'react';
import { colors } from '@hedviginsurance/brand';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';
import { Spacing } from 'src/components/Spacing';

import { Title } from './common/title';
import { Subtitle } from './common/subtitle';

const PAYMENT_TITLE = 'Betalning';
const PAYMENT_SUBTITLE = 'Autogiro månadsvis';

export const Payment = () => (
  <BubbleAnimation delay={100}>
    <Bubble width={135} height={135} backgroundColor={colors.PURPLE}>
      <Title>{PAYMENT_TITLE}</Title>
      <Spacing height={2.5} />
      <Subtitle>{PAYMENT_SUBTITLE}</Subtitle>
    </Bubble>
  </BubbleAnimation>
);
