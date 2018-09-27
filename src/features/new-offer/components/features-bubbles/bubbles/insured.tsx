import * as React from 'react';
import { colors } from '@hedviginsurance/brand';

import { Spacing } from 'src/components/Spacing';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { TranslationsPlaceholderConsumer } from 'src/components/translations/placeholder-consumer';

import { Bubble } from '../bubble';
import { BubbleAnimation } from '../bubble-animation';
import { Title } from './common/title';
import { Subtitle } from './common/subtitle';

const INSURED_TITLE = 'Försäkrade';
const INSURED_SUBTITLE = 'personer';

interface InsuredProps {
  personsInHousehold: number;
}

export const Insured: React.SFC<InsuredProps> = ({ personsInHousehold }) => (
  <BubbleAnimation delay={0}>
    <Bubble width={110} height={110} backgroundColor={colors.PURPLE}>
      <TranslationsConsumer textKey="OFFER_BUBBLES_INSURED_TITLE">
        {(text) => <Title>{text}</Title>}
      </TranslationsConsumer>
      <Spacing height={2.5} />
      <TranslationsPlaceholderConsumer
        textKey="OFFER_BUBBLES_INSURED_SUBTITLE"
        replacements={{
          personsInHousehold,
        }}
      >
        {(nodes) => <Subtitle>{nodes}</Subtitle>}
      </TranslationsPlaceholderConsumer>
    </Bubble>
  </BubbleAnimation>
);
