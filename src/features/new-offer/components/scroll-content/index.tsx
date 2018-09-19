import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View } from 'react-native';
import { colors } from '@hedviginsurance/brand';
import { Arrow } from 'src/components/icons/Arrow';
import { Spacing } from 'src/components/Spacing';
import { Parallel, Spring } from 'src/components/animated';

export const Content = styled(View)({
  backgroundColor: colors.WHITE,
  height: 2000,
  width: '100%',
  shadowColor: colors.BLACK,
  shadowOpacity: 0.1,
  shadowRadius: 20,
  shadowOffset: {
    height: -5,
  },
});

export const ScrollContent = () => (
  <Parallel>
    <Spring
      bounciness={5}
      delay={950}
      mapStyles={(animatedValue) => ({
        width: '100%',
        alignItems: 'center',
        transform: [{ translateY: animatedValue }],
      })}
      toValue={0}
      initialValue={150}
    >
      <Arrow width={20} height={20} />
      <Spacing height={20} />
      <Content />
    </Spring>
  </Parallel>
);
