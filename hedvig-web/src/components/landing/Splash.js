import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Lottie from "react-lottie"
import {
  SplashStyled,
  SplashText,
  AnimationStyled,
  AnimationsContainer
} from "../styles/landing"
import { TurquoiseRoundedButtonStyled } from "../styles/button"
import { Heading1 } from "../styles/typography"

export const PurpleHeading = Heading1.extend`
  color: ${props => props.theme.colors.blackPurple};
  margin-bottom: 0;
`

const getAnimationDimensions = () => {
  let width = window.innerWidth
  if (width < 576) {
    return {
      height: 520,
      width: 347
    }
  } else {
    return {
      height: 615,
      width: 410
    }
  }
}

const Splash = () => {
  let animationDimensions = getAnimationDimensions()
  return (
    <SplashStyled>
      <AnimationsContainer>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: require("../../bundledAssets/animations/desktop.json")
          }}
          height={animationDimensions.height}
          width={animationDimensions.width}
        />
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: require("../../bundledAssets/animations/drawer.json")
          }}
          height={animationDimensions.height}
          width={animationDimensions.width}
        />
      </AnimationsContainer>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: require("../../bundledAssets/animations/water.json")
        }}
        height={720}
        width={1280}
      />
      <SplashText>
        <PurpleHeading>Det ska vara lätt när det är svårt</PurpleHeading>
        <p style={{ maxWidth: 360, marginBottom: 0 }}>
          Därför har vi gjort om försäkring från grunden för dig, ditt hem och
          dina prylar
        </p>
        <Link to="/chat">
          <TurquoiseRoundedButtonStyled>
            Säg hej till Hedvig!
          </TurquoiseRoundedButtonStyled>
        </Link>
      </SplashText>
    </SplashStyled>
  )
}

export default Splash
