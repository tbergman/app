import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

const AnimatableTouchableHighlight = Animated.createAnimatedComponent(
  TouchableHighlight,
);

const styles = StyleSheet.create({
  chatOptionButton: {
    minHeight: 20,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    borderColor: '#651eff',
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  buttonColorSelected: { backgroundColor: '#651eff' },
  buttonColorNotSelected: { backgroundColor: '#ffffff' },
  buttonHidden: { opacity: 0 },
  buttonText: {
    fontFamily: 'circular',
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: 'transparent',
  },
  buttonTextColorSelected: { color: '#ffffff' },
  buttonTextColorNotSelected: { color: '#651eff' },
});

export class AnimatedSingleSelectOptionButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    hidden: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
    disabled: false,
    hidden: false,
  };

  state = {
    slideAnim: new Animated.Value(300),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(100),
      Animated.spring(this.state.slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const { title, selected, disabled, onPress, hidden } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.chatOptionButton,
          {
            transform: [{ translateX: this.state.slideAnim }],
          },
          selected ? styles.buttonColorSelected : styles.buttonColorNotSelected,
          hidden ? styles.buttonHidden : undefined,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            selected
              ? styles.buttonTextColorSelected
              : styles.buttonTextColorNotSelected,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export class AnimatedMultipleSelectOptionButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };
  state = {
    slideAnim: new Animated.Value(250),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(100),
      Animated.spring(this.state.slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const { selected, title, onPress } = this.props;
    return (
      <AnimatableTouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
        activeOpacity={0.5}
        style={[
          styles.chatOptionButton,
          {
            transform: [
              {
                translateX: this.state.slideAnim,
              },
            ],
          },
          selected ? styles.buttonColorSelected : styles.buttonColorNotSelected,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            selected
              ? styles.buttonTextColorSelected
              : styles.buttonTextColorNotSelected,
          ]}
        >
          {title}
        </Text>
      </AnimatableTouchableHighlight>
    );
  }
}
