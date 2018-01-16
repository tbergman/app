import React from "react"
import SayHi from "./landing/SayHi"
import Collaboration from "./landing/Collaboration"
import Splash from "./landing/Splash"
import ClaimDemo from "./landing/ClaimDemo"
import AssetTrackerDemo from "./landing/AssetTrackerDemo"
import Footer from "./Footer"
import { Header } from "../components/Header"
import ModelExplanation from "./landing/ModelExplanation"
import HeaderRight from "./landing/HeaderRight"
require("purecss/build/base.css")
require("purecss/build/grids.css")
require("purecss/build/grids-responsive.css")

const Landing = () => {
  return (
    <div>
      <Header headerRight={<HeaderRight />} />

      <Splash />

      <ClaimDemo />

      <AssetTrackerDemo />

      <ModelExplanation />
      <SayHi />
      <Collaboration />

      <Footer />
    </div>
  )
}

export default Landing
