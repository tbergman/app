import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";
import { TurquoiseRoundedButtonStyled } from "../styles/button";

export const Container = styled.div`
  height: 100%;
`

export const Hero = styled.div`
  height: 900px;
  display: flex;
  background-image: 
    linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${props => props.imageUrl});
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
`

export const Heading = styled.h1`
  font-family: "Merriweather";
  color: white;
  font-size: 48px;
  font-weight: 400;
`

export const TextRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em;

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
  }
`

export const TextHeading = styled.h3`
  font-size: 18px;
  font-weight: 800;
  font-family: "Merriweather";

  @media (min-width: 800px) {
    width: 20%;
    align-self: flex-start;
  }
`

export const TextBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;

  @media (min-width: 800px) {
    width: 70%;
  }

  h5 {
    font-family: "Merriweather";
  }
`

export const SayHi = () => (
  <Link to="/chat">
    <TurquoiseRoundedButtonStyled>
      Säg hej till Hedvig!
    </TurquoiseRoundedButtonStyled>
  </Link>
)
