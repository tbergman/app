import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import {
  HeadingSubText
} from "../styles/landing"
import { TurquoiseRoundedButtonStyled } from "../styles/button"

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  height: 600px;

  @media (min-width: 800px) {
    padding: 3em 0 0;
    height: 900px;
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
    padding: 0 0 0 8em;
    align-items: left;
  }
`

const Heading = styled.h1`
  font-family: "Merriweather";
  font-weight: 400;
  font-size: 72px;
`

const Splash = () => {
  return (
    <Container>
      <TextContainer>
        <Heading>Gör det lätt när det är svårt</Heading>
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
