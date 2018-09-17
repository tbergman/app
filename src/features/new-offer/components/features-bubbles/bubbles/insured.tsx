import * as React from 'react';
import { colors, fonts } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { Text, View } from 'react-native';

import { Bubble } from '../bubble';
import { Spacing } from 'src/components/Spacing';

const INSURED_TITLE = 'Försäkrade';
const INSURED_SUBTITLE = '2 personer';

const Title = styled(Text)({
  color: colors.WHITE,
  fontFamily: fonts.CIRCULAR,
  fontWeight: '500',
  fontSize: 20,
});

const Subtitle = styled(Text)({
  color: colors.WHITE,
  fontFamily: fonts.CIRCULAR,
  fontWeight: '500',
  fontSize: 20,
});

export const Insured = () => (
  <Bubble width={150} height={150} backgroundColor={colors.PURPLE}>
    <Title>{INSURED_TITLE}</Title>
    <Spacing height={2.5} />
    <Subtitle>{INSURED_SUBTITLE}</Subtitle>
  </Bubble>
);
