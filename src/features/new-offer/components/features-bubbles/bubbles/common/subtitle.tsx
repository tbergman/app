import styled from '@sampettersson/primitives';
import { Text } from 'react-native';
import { colors, fonts } from '@hedviginsurance/brand';

export const Subtitle = styled(Text)({
  color: colors.WHITE,
  fontFamily: fonts.CIRCULAR,
  fontWeight: '500',
  fontSize: 16,
  paddingLeft: 10,
  paddingRight: 10,
  textAlign: 'center',
});
