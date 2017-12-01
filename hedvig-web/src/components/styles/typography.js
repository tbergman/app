import styled from "styled-components"

export const Heading1 = styled.span`
  font-family: "Merriweather";
  color: ${props => props.theme.colors.webHeading};

  @media screen and (max-width: 576px) {
    font-size: 32px;
    line-height: 48px;
  }

  @media screen and (min-width: 577px) {
    font-size: 40px;
    line-height: 56px;
  }
`

export const Heading2 = styled.span`
  font-family: "Merriweather";
  color: ${props => props.theme.colors.webHeading};

  @media screen and (max-width: 576px) {
    font-size: 24px;
    line-height: 40px;
  }

  @media screen and (min-width: 577px) and (max-width: 992px) {
    font-size: 32px;
    line-height: 48px;
  }

  @media screen and (min-width: 993px) {
    /*font-size: 40px;
    line-height: 56px;*/
    font-size: 36px;
    line-height: 52px;
  }
`

export const WhiteHeading2 = Heading2.extend`
  color: white;
`

export const BlackPurpleHeading2 = Heading2.extend`
  color: ${props => props.theme.colors.blackPurple};
`
