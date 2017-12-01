import styled from "styled-components"
import { Heading2 } from "./typography"

export const StaticHeading2 = Heading2.extend`
  color: ${props => props.theme.colors.blackPurple};
`

export const HeroStaticHeading2 = Heading2.extend`
  color: ${props => props.theme.colors.black};
`

export const Container = styled.div`
  padding: 64px 15px;
  @media (min-width: 768px) {
    padding: 64px 15px;
  }
  @media (min-width: 992px) {
    padding: 88px 24px;
  }
  @media (min-width: 1200px) {
    padding: 88px 32px;
  }
  @media (min-width: 1366px) {
    padding: 88px 113px;
  }

  p {
    margin-bottom: 56px;
    @media (min-width: 768px) {
      margin-bottom: 56px;
    }
    @media (min-width: 1200px) {
      margin-bottom: 131px;
    }
  }
`

export const HeroContainer = styled.div`
  height: 595px;
  @media (min-width: 576px) {
    height: 672px;
  }
  display: flex !important;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: url("https://picsum.photos/g/950/670");
  background-size: cover;
  background-repeat: no-repeat;
`

export const LinkStyled = styled.a`
  color: ${props => props.theme.colors.purple};
  font-size: 16px;
  display: block;
  text-decoration: none;
  margin-top: 1em;
`
