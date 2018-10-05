import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View } from 'react-native';
import { colors } from '@hedviginsurance/brand';

const BarContainer = styled(View)({
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  position: 'absolute',
  top: -15,
  height: 15,
  paddingBottom: 8,
});

const WhiteBar = styled(View)({
  height: 6,
  width: 50,
  backgroundColor: colors.WHITE,
  borderRadius: 10,
  opacity: 0.8,
});

export const Bar = () => (
  <BarContainer>
    <WhiteBar />
  </BarContainer>
);
