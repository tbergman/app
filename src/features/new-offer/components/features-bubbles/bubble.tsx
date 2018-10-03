import * as React from 'react';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';

interface BubbleProps {
  width: number;
  height: number;
  backgroundColor: string;
}

const BubbleContainer = styled(View)(
  ({ width, height, backgroundColor }: BubbleProps) => ({
    width,
    height,
    borderRadius: width / 2,
    backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  }),
);

export const Bubble: React.SFC<BubbleProps> = ({
  width,
  height,
  backgroundColor,
  children,
}) => (
  <BubbleContainer
    width={width}
    height={height}
    backgroundColor={backgroundColor}
  >
    {children}
  </BubbleContainer>
);
