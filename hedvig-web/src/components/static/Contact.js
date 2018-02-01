import React from "react"
import { Header } from "../Header";
import Footer from "../Footer"
import { Container, Hero } from "./common"


export default () => (
  <Container>
    <Header />
    <Hero imageUrl="/assets/web/Images/map.png" />
    <div style={{display: "flex", flexDirection: "column", textAlign: "center", marginBottom: "3em"}}>
      <h1 style={{fontSize: "28px", lineHeight: "32px", fontFamily: "Merriweather", color: "#0f007a", marginTop: "2em", fontWeight: "400"}}>Vill du komma i kontakt med oss?</h1>
      <p>
        <a href="mailto:hedvig@hedvig.com">hedvig@hedvig.com</a><br/>
        <a href="mailto:press@hedvig.com">press@hedvig.com</a><br/>
        <a href="mailto:careers@hedvig.com">careers@hedvig.com</a><br/>
      </p>
    </div>
    <Footer />
  </Container>
)
