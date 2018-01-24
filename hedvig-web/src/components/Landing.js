import React from "react"
import Collaboration from "./landing/Collaboration"
import Splash from "./landing/Splash"
import ClaimDemo from "./landing/ClaimDemo"
import AssetTrackerDemo from "./landing/AssetTrackerDemo"
import Footer from "./Footer"
import { Header } from "../components/Header"
import ModelExplanation from "./landing/ModelExplanation"
import WaterDamagePage from "./landing/WaterDamagePage";
require("purecss/build/base.css")
require("purecss/build/grids.css")
require("purecss/build/grids-responsive.css")

const Landing = () => { // Fragment is used as a quick hack to render nothing in place of a better solution right now
  return (
    <div>
      <Header headerRight={<React.Fragment></React.Fragment>}/>
      <Splash />
      <ClaimDemo />
      <WaterDamagePage />
      <AssetTrackerDemo />
      <ModelExplanation />
      <Collaboration />
      <Footer />
    </div>
  )
}

export default Landing
