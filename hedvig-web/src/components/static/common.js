import React from "react"
import { Header } from "../Header"
import Footer from "../Footer"
import { Container, StaticHeading2, HeroContainer } from "../styles/static"

export const Grid = ({ children }) => <div className="pure-g">{children}</div>

export const Hero = ({ children }) => (
  <HeroContainer className="pure-u-1-1">{children}</HeroContainer>
)

export const Heading = ({ children }) => (
  <div className="pure-u-1-1 pure-u-lg-1-2">
    <StaticHeading2>{children}</StaticHeading2>
  </div>
)

export const Paragraph = ({ children }) => (
  <div className="pure-u-1-1 pure-u-lg-1-2">
    <p>{children}</p>
  </div>
)

export const StaticPage = ({ heroContent = null, children }) => (
  <div>
    <Header />
    <Grid>
      <Hero>{heroContent}</Hero>
      <Container>{children}</Container>
    </Grid>
    <Footer />
  </div>
)
