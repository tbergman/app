import React from "react"
import { keyframes } from "styled-components"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import Collaboration from "./sections/Collaboration"
import Splash from "./sections/Splash"
import ClaimDemo from "./sections/ClaimDemo"
import AssetTrackerDemo from "./sections/AssetTrackerDemo"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import ModelExplanation from "./sections/ModelExplanation"
import WaterDamagePage from "./sections/WaterDamage";
import CallToAction from "./sections/CallToAction"
import { TurquoiseRoundedButtonStyled } from "../../components/styles/button"

const SlideDownAnimation = keyframes`
  from {
    margin-bottom: 20px;
  }

  to {
    margin-bottom: 0px;
  }
`

const AnimatedCtaButton = TurquoiseRoundedButtonStyled.extend`
  overflow-y: hidden;
  animation: ${SlideDownAnimation} 0.1s linear;
  margin-left: auto;
  white-space: nowrap;
`

const HidingCtaButton = ({isVisible, registerCtaClick}) => (
  !isVisible ? (
    <Link to="/chat" onClick={registerCtaClick}>
      <AnimatedCtaButton>Sätt upp mig på väntelistan</AnimatedCtaButton>
    </Link>
  ) : (<div></div>)
)

const ConnectedHidingCtaButton = connect(
  state => ({
    isVisible: state.landing.visible
  }),
  dispatch => ({
    registerCtaClick: () => dispatch({type: "ANALYTICS/CTA_CLICK", payload: {location: "header"}})
  })
)(HidingCtaButton)

const Landing = () => { // Fragment is used as a quick hack to render nothing in place of a better solution right now
  return (
    <div>
      <Header headerRight={<ConnectedHidingCtaButton />}/>
      <Splash />
      <WaterDamagePage />
      <ClaimDemo />
      <AssetTrackerDemo />
      <ModelExplanation />
      <CallToAction />
      <Collaboration />
      <Footer />
    </div>
  )
}

export default Landing
