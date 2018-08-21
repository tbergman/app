import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: colors.TRANSPARENT,
  },
  buttonTextColorSelected: {
    color: colors.WHITE,
  },
  buttonTextColorNotSelected: {
    color: colors.PURPLE,
  },
});

export class StyledButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        accessibilityComponentType="button"
        {...this.props}
      />
    );
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
