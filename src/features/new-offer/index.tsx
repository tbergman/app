import * as React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { PriceBubble } from 'src/features/new-offer/components/price-bubble';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import { FeaturesBubbles } from 'src/features/new-offer/components/features-bubbles';

const ScrollContainer = styled(ScrollView)({
  backgroundColor: colors.BLACK_PURPLE,
});

export const NewOffer: React.SFC = () => (
  <ScrollContainer
    contentContainerStyle={{ alignItems: 'center', paddingTop: 50 }}
  >
    <PriceBubble />
    <FeaturesBubbles />
  </ScrollContainer>
);
