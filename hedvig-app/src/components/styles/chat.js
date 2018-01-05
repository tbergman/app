import React from "react"
import styled from "styled-components/native"
import { Animated } from "react-native"
import * as typography from "./typography"
import HedvigKeyboardAvoidingView from "../../components/HedvigKeyboardAvoidingView"

export const StyledChatContainer = styled.View`
  flex: 1;
  align-self: stretch;
  background: ${props => props.theme.colors.white};
`

export const StyledMessageAndResponseArea = styled(HedvigKeyboardAvoidingView)`
  flex: 1;
`

export const StyledMessageArea = styled.View`
  flex: auto;
  padding: 16px;
`

export const StyledResponseArea = styled.View`
  align-self: stretch;
`

// Regular text messages

export const StyledDefaultMessageText = typography.MerriweatherFontText.extend`
  color: ${props => props.theme.colors.hedvigMessageText};
  font-size: ${props => props.theme.typography.hedvigMessage.fontSize};
`

export const StyledDefaultUserMessageText = typography.CircularFontText.extend`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.userMessage.fontSize};
`

export const StyledChatMessage = styled.View`
  flex-direction: row;
  padding: 12px 12px;
  border-radius: 8px;
  max-width: 88%;
  background: ${props => props.theme.colors.hedvigMessageBackground};
  margin-bottom: 8px;
`

const _animatableStyledChatMessage = Animated.createAnimatedComponent(StyledChatMessage);
export class AnimatedStyledChatMessage extends React.Component {
  state = {
    slideAnim: new Animated.Value(-100)
  }

  componentDidMount() {
    Animated.spring(
      this.state.slideAnim,
      {
        toValue: 0,
        useNativeDriver: true
      }
    ).start()
  }

  render() {
    return (
      <_animatableStyledChatMessage style={{transform: [{translateX: this.state.slideAnim}]}} {...this.props}>
        { this.props.children }
      </_animatableStyledChatMessage>
    )
  }
}

export const StyledUserChatMessage = styled.View`
  margin-bottom: 8px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.primary};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  align-self: center;
`

export const StyledHeroMessage = StyledChatMessage.extend`
  flex-direction: column;
  width: 98%;
`

export const StyledAvatarContainer = styled.View`
  margin-left: 15px;
  margin-bottom: 15px;
`

// Single select & multiple select

export const StyledMarginContainer = styled.View`
  margin: 0px 16px 40px 16px;
  flex-direction: ${props => (props.wrap ? "row" : "column")};
  justify-content: flex-end;
  flex-wrap: wrap;
`

export const StyledRightAlignedOptions = styled.View`
  flex-direction: row-reverse;
  align-self: flex-end;
  align-items: center;
  margin-left: 5px;
`

// Multiple select

export const StyledOptionsContainer = styled.View`
  margin-bottom: 8px;
  flex-direction: ${props => (props.wrap ? "row" : "column")};
  justify-content: flex-end;
  flex-wrap: wrap;
`

// Text input

export const StyledTextInputContainer = styled.View`
  flex-direction: row;
  margin-right: 8px;
  margin-left: 8px;
  margin-bottom: 8px;
`

export const StyledTextInput = styled.TextInput`
  flex: 1;
  align-self: stretch;
  height: ${props => props.theme.input.default.height};
  padding: 10px 16px;
  margin-right: 8px;
  background-color: ${props => props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  font-size: ${props => props.theme.typography.input.fontSize};
  overflow: hidden;
`

// Date input

export const StyledDatePickerResultRow = styled.View`
  margin: 0 8px 8px 8px;
  flex-direction: row;
`

export const StyledFakeTextInput = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  height: ${props => props.theme.input.default.height};
  padding: 10px 16px;
  margin-right: 8px;
  background-color: ${props => props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
`

export const TouchableStyledFakeTextInput = styled.TouchableOpacity`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  height: ${props => props.theme.input.default.height};
  padding: 10px 16px;
  margin-right: 8px;
  background-color: ${props => props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
`

export const StyledFakeTextInputText = styled.Text`
  font-size: ${props => props.theme.typography.input.fontSize};
  color: ${props => props.theme.typography.activeText.color};
`
