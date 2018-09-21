import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from '@emotion/primitives';

import { colors, fonts } from '@hedviginsurance/brand';

interface LogoutButtonProps {
  onPress(): void
}

const LogoutButtonContainer = styled(TouchableOpacity)({
  minHeight: 20,
  paddingTop: 8,
  paddingRight: 16,
  paddingLeft: 16,
  paddingBottom: 8,
  backgroundColor: colors.WHITE,
  borderColor: colors.PURPLE,
  borderWidth: 1,
  borderRadius: 24,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
});

const LogoutButtonText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 16,
  lineHeight: 20,
  backgroundColor: colors.TRANSPARENT,
  color: colors.PURPLE,
});

const LogoutButton: React.SFC<LogoutButtonProps> = ({ onPress, children }) => (
  <LogoutButtonContainer onPress={onPress}>
    <LogoutButtonText>{children}</LogoutButtonText>
  </LogoutButtonContainer>
);

export { LogoutButton };
