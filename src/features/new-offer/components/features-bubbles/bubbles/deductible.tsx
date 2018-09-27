import * as React from 'react';
import { colors } from '@hedviginsurance/brand';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';
import { Spacing } from 'src/components/Spacing';
import { TranslationsConsumer } from 'src/components/translations/consumer';

import { Title } from './common/title';
import { Subtitle } from './common/subtitle';

export const Deductible = () => (
  <BubbleAnimation delay={100}>
    <Bubble width={90} height={90} backgroundColor={colors.TURQUOISE}>
      <TranslationsConsumer textKey="OFFER_BUBBLES_DEDUCTIBLE_TITLE">
        {(text) => <Title>{text}</Title>}
      </TranslationsConsumer>
      <Spacing height={2.5} />
      <TranslationsConsumer textKey="OFFER_BUBBLES_DEDUCTIBLE_SUBTITLE">
        {(text) => <Subtitle>{text}</Subtitle>}
      </TranslationsConsumer>
    </Bubble>
  </BubbleAnimation>
);
