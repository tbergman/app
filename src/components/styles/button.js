import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'circular',
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: 'transparent',
  },
  buttonTextColorSelected: {
    color: '#ffffff',
  },
  buttonTextColorNotSelected: {
    color: '#651eff',
  },
  buttonTextInverted: {
    fontFamily: 'circular',
    fontSize: 16,
    color: '#ffffff',
  },
  roundedButton: {
    minHeight: 20,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  roundedButtonInverted: { backgroundColor: '#651eff' },
});

export class StyledButton extends React.Component {
  render() {
    return <TouchableOpacity {...this.props} />;
  }
}

export class StyledDisabledButton extends React.Component {
  render() {
    return <View {...this.props} />;
  }
}

export class StyledButtonText extends React.Component {
  render() {
    const { style, selected, ...props } = this.props;
    return (
      <Text
        style={[
          styles.buttonText,
          selected
            ? styles.buttonTextColorSelected
            : styles.buttonTextColorNotSelected,
          style,
        ]}
        {...props}
      />
    );
  }
}

export class StyledButtonTextInverted extends React.Component {
  render() {
    return <Text {...this.props} style={styles.buttonTextInverted} />;
  }
}

export class StyledRoundedButton extends React.Component {
  render() {
    return <TouchableOpacity {...this.props} style={styles.roundedButton} />;
  }
}

export class StyledRoundedButtonInverted extends React.Component {
  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={[styles.roundedButton, styles.roundedButtonInverted]}
      />
    );
  }
}
