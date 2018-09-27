import * as React from 'react';
import { colors } from '@hedviginsurance/brand';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';
import { Spacing } from 'src/components/Spacing';
import { TranslationsConsumer } from 'src/components/translations/consumer';

import { Title } from './common/title';
import { Subtitle } from './common/subtitle';

export const BindingPeriod = () => (
  <BubbleAnimation delay={50}>
    <Bubble width={135} height={135} backgroundColor={colors.PINK}>
      <TranslationsConsumer textKey="OFFER_BUBBLES_BINDING_PERIOD_TITLE">
        {(text) => <Title>{text}</Title>}
      </TranslationsConsumer>
      <Spacing height={2.5} />
      <TranslationsConsumer textKey="OFFER_BUBBLES_BINDING_PERIOD_SUBTITLE">
        {(text) => <Subtitle>{text}</Subtitle>}
      </TranslationsConsumer>
    </Bubble>
  </BubbleAnimation>
);
