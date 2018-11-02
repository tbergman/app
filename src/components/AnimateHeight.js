import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';

const {
  divide,
  greaterThan,
  set,
  cond,
  startClock,
  stopClock,
  clockRunning,
  block,
  spring,
  add,
  debug,
  Value,
  Clock,
} = Animated;

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 50,
    mass: 5,
    stiffness: 100,
    overshootClamping: true,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, -2500),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

export default class AnimateHeight extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.height !== this.props.height) {
      const clock = new Clock();
      this._trans = runSpring(clock, this.props.height, nextProps.height);
    }
  }
  componentDidMount() {}
  render() {
    return (
      <Animated.View
        style={[
          {
            height: this._trans,
          },
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
