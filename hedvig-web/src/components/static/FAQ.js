import React from "react"

import { Container, Hero, Heading, SayHi } from "./common"
import { Header } from "../Header";

const FAQ = () => (
  <Container>
    <Header headerRight={<SayHi />}/>
    <Hero imageUrl="/assets/web/Images/Norrsken-2.jpg">
      <Heading>FAQ</Heading>
    </Hero>
  </Container>
)

export default FAQ
