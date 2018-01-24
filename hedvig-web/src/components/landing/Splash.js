import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import {
  HeadingSubText
} from "../styles/landing"
import { TurquoiseRoundedButtonStyled } from "../styles/button"
import { Heading1 } from "../styles/typography"

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  height: 600px;
  background-image: url("/assets/web/splash/backdrop.svg");
  background-size: cover;

  @media (min-width: 800px) {
    padding: 3em 0 0;
    height: 1000px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
  
  @media (min-width: 800px) {
    padding: 0 0 0 4em;
    align-items: left;
  }
`

const CustomHeading = Heading1.extend`
  padding: 0,
  font-weight: 800
`

const Splash = () => {
  return (
    <Container>
      <TextContainer>
        <CustomHeading>Gör det lätt när det är svårt</CustomHeading>
          <HeadingSubText>
            Hedvig är försäkring som du aldrig upplevt det tidigare
          </HeadingSubText>
        <Link to="/chat">
          <TurquoiseRoundedButtonStyled>
            Säg hej till Hedvig!
          </TurquoiseRoundedButtonStyled>
        </Link>
      </TextContainer>
    </Container>
  )
}

export default Splash
