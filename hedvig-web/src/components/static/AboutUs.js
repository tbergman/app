import React from "react"
import styled from "styled-components"

import {
  Container,
  Hero,
  SayHi,
  TextRow,
  TextHeading,
  TextBody
} from "./common"
import { Header } from "../Header"
import Footer from "../Footer"

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5em 0 0;
`

export const AboutUs = () => (
  <Container>
    <Header headerRight={<SayHi />}/>
    <Hero imageUrl="/assets/web/Images/Norrsken-4.jpg">
    </Hero>
    <TextContainer>
      <TextRow>
        <TextHeading>Vår historia</TextHeading>
        <TextBody>
          <p>
            Hedvig grundades i Stockholm 2016.
            När vi satte igång kunde vi ungefär lika mycket om försäkring som du.
            Det var toppen, för det betydde att vi tänkte om och utmanade alla gamla sanningar.
            Vårt mål var enkelt. Att göra försäkring schysst, enkelt och blixtsnabbt.
          </p>
          <p>
            Och oroa dig inte, nu kan vi det mesta om försäkring.
            Men för att vara på den säkra sidan samarbetar Hedvig med en av världens största återförsäkringskoncerner.
            De kan allt.
          </p>
          <p>
            Vi backas av investerare som har investerat i,
            byggt upp och gett dig några av Sveriges bästa tjänster – som Spotify,
            Avanza och Klarna.
          </p>
        </TextBody>
      </TextRow>
      <TextRow>
        <TextHeading>Varför vi finns</TextHeading>
        <TextBody>
          <p>
            Om sanningen ska fram är det få som gillar att betala för sin försäkring.
            Fullt förståeligt, om man tänker på hur försäkring fungerar idag.
            Du betalar dina räkningar år efter år, utan att veta riktigt vart pengarna tar vägen.
            När du väl behöver den hjälp du betalat för så får du känslan av att bli lite motarbetad,
            och inte riktigt bli litad på.
          </p>
          <p>
            Varför är det så?
          </p>
          <p>
            Problemet med vanliga försäkringsbolag är att de tjänar mer när de betalar dig mindre.
          </p>
          <p>
            Hedvig är inget vanligt försäkringsbolag.
            Vi behandlar dina pengar som dina.
            Vi tar ut en fast avgift för att driva och utveckla tjänsten.
            Resten av det du betalar öronmärks för att ersätta skador.
            Det är inte våra pengar.
            De ligger på att separat konto och kan bara användas för att betala ersättning till våra medlemmar.
            När alla skador har betalats skänks eventuellt överskott till organisationer som gör världen bättre.
            Du väljer själv vad ditt hjärta klappar för.
          </p>
          <p>
            Allt vi bryr oss om är att ge dig fantastisk hjälp när du behöver det.
            Och när du inte gör det, så hjälper vi dig hjälpa andra.
            Vi tycker det är så försäkring borde fungera.
          </p>
        </TextBody>
      </TextRow>
    </TextContainer>
    <Footer />
  </Container>
)

export default AboutUs
