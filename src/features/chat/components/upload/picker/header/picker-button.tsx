import { TouchableOpacity } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';

export const PickerButton = styled(TouchableOpacity)({
  width: 110,
  height: 110,
  backgroundColor: colors.DARK_GRAY,
  borderRadius: 10,
});
