import * as React from 'react';
import { TouchableOpacity, View, Animated, ViewProps } from 'react-native';
import { Consumer } from './context';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import { Plus } from 'src/components/icons/Plus';
import { Parallel, Spring } from 'animated-react-native-components';

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const Button = styled(TouchableOpacity)({
  width: 40,
  height: 40,
  backgroundColor: colors.PURPLE,
  borderRadius: 20,
  marginRight: 10,
  alignItems: 'center',
  justifyContent: 'center',
});

export const UploadButton = () => (
  <Consumer>
    {({ setIsOpen, isOpen }) => (
      <Button onPress={() => setIsOpen(!isOpen)}>
        <Parallel>
          <Spring
            toValue={isOpen ? 1 : 0}
            initialValue={isOpen ? 1 : 0}
            config={{ bounciness: 5 }}
          >
            {(animatedValue) => (
              <AnimatedView
                style={{
                  transform: [
                    {
                      rotate: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '45deg'],
                      }),
                    },
                  ],
                }}
              >
                <Plus width={35} height={35} />
              </AnimatedView>
            )}
          </Spring>
        </Parallel>
      </Button>
    )}
  </Consumer>
);
