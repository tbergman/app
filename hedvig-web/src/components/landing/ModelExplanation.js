import React from "react"
import {
  PurpleHeading,
  LandingComponentSection,
  SubItemContainer,
  SubItem,
  HeadingContainer,
  SubItemText
} from "../styles/landing"

const Container = LandingComponentSection.extend`
  text-align: center;
  flex-direction: column;
  @media (min-width: 1024px) {
    text-align: left;
  }
  height: 800px;

  border-top: solid 1px ${props => props.theme.colors.lightGray};
  padding-top: 46px;
  padding-bottom: 46px;
  @media (min-width: 768px) {
    padding-top: 56px;
    padding-bottom: 56px;
  }
  @media (min-width: 992px) {
    padding-top: 142px;
    padding-bottom: 142px;
  }
  @media (min-width: 1200px) {
    padding-top: 160px;
    padding-bottom: 160px;
  }
`

export const ModelExplanation = () => (
  <Container>
    <HeadingContainer>
      <PurpleHeading style={{display: "block", paddingBottom: "12px"}}>
        Schysst för dig, och världen runtomkring
      </PurpleHeading>
      <p style={{maxWidth: "600px", margin: "auto"}}>
        Hedvig fungerar inte som ett vanligt försäkringsbolag. Vi tar en låg fast avgift, betalar blixtsnabbt och skänker överskottet till ett gott ändamål
      </p>
    </HeadingContainer>
    <SubItemContainer>
      <SubItem>
        <img width={100} height={100} src="/assets/icons/profil/personlig_info.svg" alt="Hedvig Logo" />
        <SubItemText>Hedvig tar en fast avgift för att ge dig blixtsnabb service</SubItemText>
      </SubItem>
      <SubItem>
        <img width={100} height={100} src="/assets/icons/perils/mina_prylar/drulle.svg" alt="Skadad telefon" />
        <SubItemText>Resten av din månadskostnad går till att täcka skador</SubItemText>
      </SubItem>
      <SubItem>
        <img width={100} height={100} src="/assets/icons/profil/valgorenhet.svg" alt="Hjärta" />
        <SubItemText>Ett bra år med lite skador blir det pengar över, det skänker vi till ett gott ändamål</SubItemText>
      </SubItem>
    </SubItemContainer>
  </Container>
)

export default ModelExplanation
