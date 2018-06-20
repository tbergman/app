import React from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text } from 'react-native';

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

export class AnimatedChatOptionButton extends React.Component {
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
