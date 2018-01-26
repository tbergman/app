import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
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
        <Heading>Säg hej till din nya bästa vän</Heading>
        <Link to="/chat">
          <TurquoiseRoundedButtonStyled>
            Hej, Hedvig!
          </TurquoiseRoundedButtonStyled>
        </Link>
      </TextContainer>
    </Container>
  )
}

export default Splash
