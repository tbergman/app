import styled from '@sampettersson/primitives';
import { View } from 'react-native';

interface SpacingProps {
  width?: number;
  height?: number;
}

export const Spacing = styled(View)(({ width, height }: SpacingProps) => ({
  width: width || 1,
  height: height || 1,
}));
