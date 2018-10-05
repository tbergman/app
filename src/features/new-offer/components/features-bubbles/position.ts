import styled from '@sampettersson/primitives';
import { View } from 'react-native';

interface PositionProps {
  top: number | string;
  left: number | string;
}

export const Position = styled(View)(({ top, left }: PositionProps) => ({
  position: 'absolute',
  top,
  left,
}));
