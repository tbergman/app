import React from "react"
import styled from "styled-components"

import { Container, SayHi, TextRow, TextHeading, TextBody } from "./common";
import { Header } from "../Header";
import Footer from "../Footer"

const CustomContainer = Container.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5em 0 0;
`

const CustomTextRow = TextRow.extend`
  margin: 4em 0;
`

const IntroParagraph = styled.p`
  margin-top: 3em;
  max-width: 1200px;
`

const Terms = () => (
  <CustomContainer>
    <Header headerRight={<SayHi />} />
    <IntroParagraph>
      Här hittar du våra olika försäkringsvillkor.
      Där i står det vad din försäkring gäller för.
      Vi har gjort vårt allra bästa för att de ska vara enkla att läsa,
      men har du några frågor är det bara att kontakta Hedvig direkt
      via din app eller maila
      <a href="mailto:hedvig@hedvig.com"> hedvig@hedvig.com</a>.
      I appen hittar du en
      tydlig översikt över allt din försäkring omfattar,
      och hur den gäller för olika saker.
      <p>
        Det är viktigt att du läser villkoret och ditt försäkringsbrev.
        Skador ersätts alltid enligt det villkor som gäller när en skada inträffar.
      </p>
      <p>
        Här nedanför hittar du också något som heter förköpsinformation.
        Det är en sammanfattning av vad försäkringen täcker.
        Där i finns också några viktiga begränsningar.
        Förköpsinformation är sådan information som du har rätt att få
        innan du köper en försäkring. Informationen finns så klart
        tillgänglig i appen också.
      </p>
    </IntroParagraph>
    <CustomTextRow>
      <TextHeading>Försäkringsvillkor</TextHeading>
      <TextBody>
        <a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rs%C3%A4kringsvillkor+-+Bostadsr%C3%A4tt+(Februari+2018).pdf">För dig som äger bostadsrätt</a>
        <a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rs%C3%A4kringsvillkor+-+Hyresr%C3%A4tt+(Februari+2018).pdf">För dig som hyr hyresrätt</a>
        <span><a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rs%C3%A4kringsvillkor+-+Andrahandshyrare+(Februari+2018).pdf">För dig som hyr hyresrätt i andra hand</a> och vill att din
        hyresvärds saker ska täckas av försäkringen</span>
        <span><a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rs%C3%A4kringsvillkor+-+Andrahandshyrare+(Februari+2018).pdf">För dig som hyr bostadsrätt i andra hand</a> och vill att din hyresvärds saker och lägenhet ska täckas av försäkringen</span>
      </TextBody>
    </CustomTextRow>
    <TextRow>
      <TextHeading>Förköpsinformation</TextHeading>
      <TextBody>
        <a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rk%C3%B6psinformation+-+Bostadsr%C3%A4tt+(Februari+2018).pdf">För dig som äger bostadsrätt</a>
        <a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rk%C3%B6psinformation+-+Hyresr%C3%A4tt+(Februari+2018).pdf">För dig som hyr hyresrätt</a>
        <span><a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rk%C3%B6psinformation+-+Andrahandshyrare+(Februari+2018).pdf">För dig som hyr hyresrätt i andra hand</a> och vill att din hyresvärds saker ska täckas av försäkringen</span>
        <span><a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rk%C3%B6psinformation+-+Andrahandshyrare+(Februari+2018).pdf">För dig som hyr bostadsrätt i andra hand</a> och vill att din hyresvärds saker och lägenhet ska täckas av försäkringen</span>
      </TextBody>
    </TextRow>
    <Footer />
  </CustomContainer>
)

export default Terms
