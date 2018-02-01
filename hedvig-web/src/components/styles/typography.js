import styled from "styled-components"

export const Heading1 = styled.span`
  font-family: "Merriweather";
  color: ${props => props.theme.colors.webHeading};
  font-size: 28px;
  line-height: 38px;

  @media screen and (min-width: 800px) {
    font-size: 40px;
    line-height: 56px;
  }
`

export const Heading2 = styled.span`
  font-family: "Merriweather";
  color: ${props => props.theme.colors.webHeading};
  font-size: 28px;
  line-height: 38px;

  @media (min-width: 800px) {
    font-size: 40px;
    line-height: 56px;
  }
`

export const WhiteHeading2 = Heading2.extend`
  color: white;
  font-size: 28px;
  line-height: 38px;

  @media (min-width: 800px) {
    font-size: 40px;
    line-height: 56px;
  }
`

export const BlackPurpleHeading2 = Heading2.extend`
  color: ${props => props.theme.colors.blackPurple};
`
