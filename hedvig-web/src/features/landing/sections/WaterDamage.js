import React from "react"
import styled from "styled-components"
import Lottie from "react-lottie"

import { SplashStyled, SplashText, AnimationsContainer } from "../../../components/styles/landing";
import { Heading1 } from "../../../components/styles/typography";


const PurpleHeading = Heading1.extend`
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
const animationDimensions = getAnimationDimensions()

const PreferredBreakOnLarge = styled.br`
  display: none;

  @media (min-width: 800px) {
    display: inline;
  }
`

const CustomHeadingSubText = styled.p`
  display: none;
  padding: 0.5em 0 0;
  margin: 0;
  line-height: 24px;

  @media (min-width: 800px) {
    display: block;
  }
`

const width = window.innerWidth

const WaterDamagePage = () => (
    <SplashStyled style={{paddingTop: "0px"}}>
      <AnimationsContainer style={{position: "absolute"}}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: require("../../../bundledAssets/animations/desktop.json")
          }}
          height={animationDimensions.height}
          width={animationDimensions.width}
        />
        { width > 800 ? (
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: require("../../../bundledAssets/animations/drawer.json")
            }}
            height={animationDimensions.height}
            width={animationDimensions.width}
          />
        ) : null }
      </AnimationsContainer>
        <SplashText>
          <PurpleHeading>Hemförsäkring för dig<br/> som bor i lägenhet</PurpleHeading>
          {/*<p style={{padding: "0.5em 0 0", margin: "0", lineHeight: "24px"}}></p>*/}
          <CustomHeadingSubText>Omdesignat från grunden. Så ditt liv blir enklare,<PreferredBreakOnLarge /> och försäkring äntligen känns schysst</CustomHeadingSubText>
        </SplashText>
    </SplashStyled>
)

export default WaterDamagePage
