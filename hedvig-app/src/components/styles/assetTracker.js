import styled from "styled-components/native"
import {
  StyledText,
  StyledSmallPassiveText,
  StyledPassiveText,
  StyledHeading
} from "./text"
import { CircularFontText, MerriweatherFontText } from "./typography"
import HedvigKeyboardAvoidingView from "../../components/HedvigKeyboardAvoidingView"

// List view

// export const StyledAssetTrackerContainer = styled.View`
// export const StyledAssetTrackerContainer = styled.KeyboardAvoidingView`
export const StyledAssetTrackerContainer = styled(HedvigKeyboardAvoidingView)`
  flex: 1;
  background-color: ${props => props.theme.colors.white};
`

export const StyledAssetListHeaderContainer = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const StyledAddItemText = CircularFontText.extend`
  color: ${props => props.theme.typography.passiveText.color}
  font-size: ${props => props.theme.typography.heading.fontSize};
`

export const StyledEmptyListText = CircularFontText.extend`
  margin: 20px;
  color: ${props => props.theme.typography.activeText.color}
  font-size: ${props => props.theme.typography.activeText.fontSize};
`

// Add / edit view

export const StyledImageSelectionContainer = styled.View`
  flex-direction: row;
  max-height: 160px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.offWhite};
  padding: 32px 16px;
`

export const StyledHeaderButton = styled.TouchableOpacity`
  align-items: center;
  margin: 0px 24px;
`

export const StyledHeaderButtonText = StyledSmallPassiveText.extend`
  width: 50px;
  margin-top: 8px;
  text-align: center;
`

export const StyledImage = styled.Image`
  height: 160px;
  align-self: stretch;
  resize-mode: cover;
`

export const StyledFormContainer = styled.ScrollView`
  flex: 1;
`

export const StyledInputContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px 16px 16px 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.offWhite};
`

export const StyledInputTexts = styled.View`
  flex: 1;
`

export const StyledInputHeader = StyledHeading

export const StyledInputText = StyledPassiveText

export const StyledTextInput = styled.TextInput`
  font-family: "circular"
  font-size: ${props => props.theme.typography.form.input.fontSize};
  color: ${props => props.theme.typography.passiveText.color};
`

export const StyledFooter = styled.View`
  padding-top: ${({ isDatePicker }) => (isDatePicker ? 0 : "32")}px;
  padding-bottom: ${({ isDatePicker }) => (isDatePicker ? 0 : "32")}px;
  z-index: 5;
`

export const StyledAssetListElement = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  padding: 16px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.offWhite};
`
