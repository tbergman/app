import * as React from 'react';
import { Container, ActionMap } from 'constate';
import { View } from 'react-native';

interface State {
  height?: number;
  width?: number;
}

interface Actions {
  setMeasurements: (height: number, width: number) => void;
}

const actions: ActionMap<State, Actions> = {
  setMeasurements: (height, width) => () => ({
    width,
    height,
  }),
};

interface MeasureProps {
  children: (height?: number, width?: number) => React.ReactNode;
}

export const Measure: React.SFC<MeasureProps> = ({ children }) => (
  <Container actions={actions} initialState={{}}>
    {({ width, height, setMeasurements }) => (
      <>
        <View
          style={{ position: 'absolute', opacity: 0 }}
          pointerEvents="none"
          onLayout={({ nativeEvent }) =>
            setMeasurements(nativeEvent.layout.height, nativeEvent.layout.width)
          }
        >
          {children(height, width)}
        </View>
        {children(height, width)}
      </>
    )}
  </Container>
);
