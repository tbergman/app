import React from "react"

import {
  Container,
  Hero,
  Heading,
  SayHi
} from "./common"
import { Header } from "../Header"

export const AboutUs = () => (
  <Container>
    <Header headerRight={<SayHi />}/> 
    <Hero imageUrl="/assets/web/Images/Norrsken-4.jpg">
      <Heading>Om Hedvig</Heading>
    </Hero>
  </Container>
)

export default AboutUs
