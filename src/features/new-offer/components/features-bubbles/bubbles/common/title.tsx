import styled from '@sampettersson/primitives';
import { Text } from 'react-native';
import { colors, fonts } from '@hedviginsurance/brand';

export const Title = styled(Text)({
  color: colors.WHITE,
  fontFamily: fonts.CIRCULAR,
  fontWeight: '700',
  fontSize: 16,
  paddingLeft: 10,
  paddingRight: 10,
  textAlign: 'center',
});
