import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";
import { TurquoiseRoundedButtonStyled } from "../styles/button";

export const Container = styled.div`
  height: 100%;
`

export const Hero = styled.div`
  height: 400px;
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
  background-position: center;
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
  min-height: max-content;

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    padding: 0 1em 2em 1em;

    &:last-child {
      padding: 0 1em 4em 1em;
    }
  }
`

export const TextHeading = styled.h3`
  font-size: 28px;
  line-height: 32px;
  font-weight: 400;
  font-family: "Merriweather";
  color: ${props => props.theme.colors.blackPurple};

  @media (min-width: 800px) {
    width: 20%;
    align-self: flex-start;
  }
`

export const TextBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;

  @media (min-width: 800px) {
    width: 70%;
  }

  h5 {
    font-family: "Merriweather";
  }

  p {
    margin: 0.5em;
  }
`

const CustomButton = TurquoiseRoundedButtonStyled.extend`
  margin-left: auto;
  white-space: nowrap;
  font-size: 16px;
`

export const SayHi = () => (
  <Link to="/chat">
    <CustomButton>
      Säg hej till Hedvig!
    </CustomButton>
  </Link>
)
