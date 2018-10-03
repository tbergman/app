import * as React from 'react';

import { TranslationsConsumer } from 'src/components/translations/consumer';

import { Subtitle } from '../common/subtitle';

export const Switcher: React.SFC = () => (
  <TranslationsConsumer textKey="OFFER_BUBBLES_START_DATE_SUBTITLE_SWITCHER">
    {(text) => <Subtitle>{text}</Subtitle>}
  </TranslationsConsumer>
);
