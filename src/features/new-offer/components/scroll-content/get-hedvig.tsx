import * as React from 'react';
import { Text, View } from 'react-native';
import { colors, fonts } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';

import { Spacing } from 'src/components/Spacing';
import { TranslationsConsumer } from 'src/components/translations/consumer';

const Title = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontWeight: '800',
  color: colors.WHITE,
  fontSize: 25,
});

const Body = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.WHITE,
  fontWeight: '400',
  fontSize: 15,
  textAlign: 'center',
});

const Block = styled(View)({
  padding: 20,
  paddingBottom: 110,
  alignItems: 'center',
  backgroundColor: colors.BLACK_PURPLE,
});

export const GetHedvig = () => (
  <Block>
    <TranslationsConsumer textKey="OFFER_GET_HEDVIG_TITLE">
      {(text) => <Title>{text}</Title>}
    </TranslationsConsumer>
    <Spacing height={15} />
    <TranslationsConsumer textKey="OFFER_GET_HEDVIG_BODY">
      {(text) => <Body>{text}</Body>}
    </TranslationsConsumer>
  </Block>
);
