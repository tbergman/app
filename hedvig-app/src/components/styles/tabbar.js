import styled from "styled-components/native"
import { CircularFontText } from "./typography"

export const StyledTabBarContainer = styled.View`
  shadow-opacity: 0.1;
  shadow-radius: 5;
  shadow-color: black;
  z-index: 100;
  elevation: 1;
`

export const StyledTabBarButton = styled.TouchableOpacity`
  flex: 1;
  border-bottom-width: 2px;
  border-bottom-color: ${props =>
    props.disabled ? props.theme.colors.primary : "transparent"};
  align-items: center;
  justify-content: center;
  height: 64px;
  background-color: ${props => props.theme.colors.white};
`

export const StyledTabBarButtonText = CircularFontText.extend`
  color: ${props =>
    props.disabled
      ? props.theme.colors.activeText
      : props.theme.colors.passiveText};
  font-size: ${props => props.theme.typography.heading.fontSize};
`
