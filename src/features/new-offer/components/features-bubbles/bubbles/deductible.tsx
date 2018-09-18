import * as React from 'react';
import { colors } from '@hedviginsurance/brand';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';
import { Spacing } from 'src/components/Spacing';

import { Title } from './common/title';
import { Subtitle } from './common/subtitle';

const DEDUCTIBLE_TITLE = 'Självrisk';
const DEDUCTIBLE_SUBTITLE = '1500kr';

export const Deductible = () => (
  <BubbleAnimation delay={100}>
    <Bubble width={90} height={90} backgroundColor={colors.TURQUOISE}>
      <Title>{DEDUCTIBLE_TITLE}</Title>
      <Spacing height={2.5} />
      <Subtitle>{DEDUCTIBLE_SUBTITLE}</Subtitle>
    </Bubble>
  </BubbleAnimation>
);
