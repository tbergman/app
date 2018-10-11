import * as React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';

import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';

const RowContainer = styled(TouchableHighlight)({
  backgroundColor: colors.WHITE,
  borderTopWidth: StyleSheet.hairlineWidth,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: colors.LIGHT_GRAY,
  padding: 20,
});

const RowText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 15,
});

interface RowProps {
  onPress: () => void;
}

export const Row: React.SFC<RowProps> = ({ children, onPress }) => (
  <RowContainer underlayColor={colors.LIGHT_GRAY} onPress={onPress}>
    <RowText>{children}</RowText>
  </RowContainer>
);
