import React from "react"
import styled from "styled-components"
import {
  PurpleHeading,
  LandingComponentSection,
  SubItemContainer,
  SubItem,
  HeadingContainer,  SubItemText,
  HeadingSubText
} from "../styles/landing"

const Container = LandingComponentSection.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  padding: 3em 0;

  @media (min-width: 800px) {
    padding: 5em 0;
    height: 700px;
  }
`

const CustomHeadingSubText = HeadingSubText.extend`
  max-width: 650px;
  text-align: center;
  margin: auto;
  padding: 1em 1em 0 1em;

  @media (min-width: 800px) {
    padding: 1em 0 0;
    text-align: center;
  }
`

const PreferredBreak = styled.br`
  @media (min-width: 800px) {
    display: none;
  }
`

export const ModelExplanation = () => (
  <Container>
    <HeadingContainer>
      <PurpleHeading>
        Schysst för dig, och världen runtomkring
      </PurpleHeading>
      <CustomHeadingSubText>
        Hedvig fungerar inte som ett vanligt försäkringsbolag. Vi tar en låg fast avgift, betalar blixtsnabbt och skänker överskottet till ett gott ändamål
      </CustomHeadingSubText>
    </HeadingContainer>
    <SubItemContainer>
      <SubItem>
        <img width={166} height={166} src="/assets/icons/profil/personlig_info.svg" alt="Hedvig Logo" />
        <SubItemText>Hedvig tar en fast avgift för<PreferredBreak /> att ge dig blixtsnabb service</SubItemText>
      </SubItem>
      <SubItem>
        <img width={166} height={166} src="/assets/icons/perils/mina_prylar/drulle.svg" alt="Skadad telefon" />
        <SubItemText>Resten av din månadskostnad<PreferredBreak /> går till att täcka skador</SubItemText>
      </SubItem>
      <SubItem>
        <img width={166} height={166} src="/assets/icons/profil/valgorenhet.svg" alt="Hjärta" />
        <SubItemText>Ett bra år med lite skador blir det<PreferredBreak /> pengar över, det skänker vi till<PreferredBreak /> ett gott ändamål</SubItemText>
      </SubItem>
    </SubItemContainer>
  </Container>
)

export default ModelExplanation
