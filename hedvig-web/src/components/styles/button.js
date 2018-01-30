import styled, { keyframes } from "styled-components"

const slideFromRight = keyframes`
  from {
    transform: translate(100px, 0px);
    animation-timing-function: ease;
  }

  to {
    transform: translate(0px, 0px);
  }
`

export const ButtonStyled = styled.button`
  font-family: "Circular Std Book";
  font-size: 18px;
  line-height: 22px;
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;

  > a {
    color: inherit;
    text-decoration: none;
    &:visited,
    &:active,
    &:hover,
    &:link {
      color: inherit;
      text-decoration: none;
    }
  }
`

export const RoundedButtonStyled = ButtonStyled.extend`
  border-radius: 24px;
`

export const TurquoiseRoundedButtonStyled = RoundedButtonStyled.extend`
  background-color: ${props => props.theme.colors.turquoise};
  color: white;
`

export const PurpleRoundedButtonStyled = RoundedButtonStyled.extend`
  background-color: ${props => props.theme.colors.purple};
  color: white;
`

export const BlackPurpleRoundedButtonStyled = RoundedButtonStyled.extend`
  background-color: ${props => props.theme.colors.blackPurple};
  color: white;
`

export const BlackPurpleRoundedButtonWhiteBorderStyled = RoundedButtonStyled.extend`
  background-color: ${props => props.theme.colors.blackPurple};
  color: white;
  border-color: white;
`

export const WhiteRoundedButtonStyled = RoundedButtonStyled.extend`
  background-color: white;
  color: ${props => props.theme.colors.purple};
  border-color: ${props => props.theme.colors.purple};
  animation: 0.5s ${slideFromRight} 1;
  
  :active,:focus {
    background-color: ${props => props.theme.colors.purple};
    color: white;
  }
`

export const InactiveWhiteRoundedButtonStyled = WhiteRoundedButtonStyled.extend`
  opacity: 0.3;
  cursor: default;
`

const iconSizes = {
  medium: 24,
  big: 40
}
export const IconButtonStyled = RoundedButtonStyled.extend`
  border: none;
  padding: 0px;
  width: ${props => iconSizes[props.size || "big"]}px;
  height: ${props => iconSizes[props.size || "big"]}px;
  background-image: url(${props => props.iconUrl});
  margin-left: auto;
`

export const InactiveIconButtonStyled = IconButtonStyled.extend`
  cursor: default;
`
