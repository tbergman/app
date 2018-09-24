import * as React from 'react';
import { colors } from '@hedviginsurance/brand';

import { Spacing } from 'src/components/Spacing';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';

import { Title } from './common/title';
import { Subtitle } from './common/subtitle';

const INSURED_TITLE = 'Försäkrade';
const INSURED_SUBTITLE = '2 personer';

export const Insured = () => (
  <BubbleAnimation delay={0}>
    <Bubble width={110} height={110} backgroundColor={colors.PURPLE}>
      <Title>{INSURED_TITLE}</Title>
      <Spacing height={2.5} />
      <Subtitle>{INSURED_SUBTITLE}</Subtitle>
    </Bubble>
  </BubbleAnimation>
);
