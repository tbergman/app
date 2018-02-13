import React from "react"
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
import { SlideDownCtaButton } from "../../components/styles/button"

const HidingCtaButton = ({isVisible, registerCtaClick}) => (
  !isVisible ? (
    <Link to="/chat" onClick={registerCtaClick}>
      <SlideDownCtaButton>Sätt upp mig på väntelistan</SlideDownCtaButton>
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
    <main>
      <Header headerRight={<ConnectedHidingCtaButton />}/>
      <Splash />
      <WaterDamagePage />
      <ClaimDemo />
      <AssetTrackerDemo />
      <ModelExplanation />
      <CallToAction />
      <Collaboration />
      <Footer />
    </main>
  )
}

export default Landing
