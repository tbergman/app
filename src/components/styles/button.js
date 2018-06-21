import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { CircularFontText } from './typography';

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

export const StyledButtonTextInverted = CircularFontText.extend`
  font-size: ${(props) => props.theme.button.textButton.fontSize};
  color: ${(props) => props.theme.colors.white};
`;

export const StyledRoundedButton = styled.TouchableOpacity`
  min-height: ${(props) => props.theme.input.option.height};
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.white};
  border-color: ${(props) => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const StyledRoundedButtonInverted = StyledRoundedButton.extend`
  background-color: ${(props) => props.theme.colors.primary};
`;

export const StyledRedRoundedButtonInverted = StyledRoundedButton.extend`
  background-color: ${(props) => props.theme.colors.red};
  border-color: ${(props) => props.theme.colors.red};
`;

export const StyledTurquoiseRoundedButtonInverted = StyledRoundedButton.extend`
  background-color: ${(props) => props.theme.colors.turquoise};
  border-color: ${(props) => props.theme.colors.turquoise};
`;
