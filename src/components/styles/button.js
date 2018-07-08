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
