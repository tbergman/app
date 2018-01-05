import React from "react";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native"
import { CircularFontText } from "./typography"

export const StyledButton = styled.TouchableOpacity``

export const StyledDisabledButton = styled.View``

export const StyledButtonText = CircularFontText.extend`
  color: ${props => props.selected ? props.theme.colors.white : props.theme.button.textButton.color};
  font-size: ${props => props.theme.button.textButton.fontSize};
  background-color: transparent;
  line-height: ${props => props.theme.button.textButton.fontSize + 4};
`

export const StyledButtonTextInverted = CircularFontText.extend`
  font-size: ${props => props.theme.button.textButton.fontSize};
  color: ${props => props.theme.colors.white};
`

export const StyledButtonTextPrefix = StyledButtonText.extend`
  color: ${props => props.theme.button.textButton.prefixColor};
`

export const StyledRoundedButton = styled.TouchableOpacity`
  min-height: ${props => props.theme.input.option.height};
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  align-self: center;
`

export const StyledChatResponseButton = StyledRoundedButton.extend`
  margin-bottom: 8px;
`

export class AnimatedStyledChatResponseButton extends React.Component {
  state = {
    slideAnim: new Animated.Value(250)
  }

  componentDidMount() {
    Animated.sequence([
      Animated.delay(100),
      Animated.spring(
        this.state.slideAnim,
        {
          toValue: 0,
          useNativeDriver: true
        }
      )
    ]).start()
  }

  render() {
    this.props.selected & console.log("I am selected")
    return (
      <TouchableOpacity
        style={{
          transform: [{translateX: this.state.slideAnim}],
          minHeight: 20,
          paddingTop: 8,
          paddingRight: 16,
          paddingBottom: 8,
          paddingLeft: 16,
          backgroundColor: this.props.selected ? "#651eff" : "#ffffff",
          borderColor: "#651eff",
          borderWidth: 1,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 8
        }}
        {...this.props}
      >
        { this.props.children }
      </TouchableOpacity>
    )
  }
}

export const StyledHiddenChatResponseButton = StyledChatResponseButton.extend`
  opacity: 0;
`

export const StyledTransparentButton = StyledRoundedButton.extend`
  background-color: transparent;
`

export const StyledMultipleSelectOptionButton = styled.TouchableHighlight`
  height: ${props => props.theme.input.default.height};
  padding: 10px 16px;
  background-color: ${props =>
    props.selected ? props.theme.colors.primary : props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  align-self: center;

  align-self: flex-end;
  margin-bottom: 8px;
`

export const StyledRoundedButtonInverted = StyledRoundedButton.extend`
  background-color: ${props => props.theme.colors.primary};
`

export const StyledRedRoundedButtonInverted = StyledRoundedButton.extend`
  background-color: ${props => props.theme.colors.red};
  border-color: ${props => props.theme.colors.red};
`

export const StyledTurquoiseRoundedButtonInverted = StyledRoundedButton.extend`
  background-color: ${props => props.theme.colors.turquoise};
  border-color: ${props => props.theme.colors.turquoise};
`

export const StyledFabButton = StyledButton.extend`
  position: absolute;
  bottom: 10;
  right: 16;
  z-index: 10;
`
