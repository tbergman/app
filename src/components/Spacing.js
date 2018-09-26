import styled from '@sampettersson/primitives';
import { View } from 'react-native';

export const Spacing = styled(View)({}, ({ width, height }) => ({
  width: width || 1,
  height: height || 1,
}));
