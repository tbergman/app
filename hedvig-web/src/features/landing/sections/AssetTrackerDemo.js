import React from "react"
import styled from "styled-components"
import {
  CenteredColumn,
  HeadingSubText,
  AbsoluteFadeInParagraph
} from "../../../components/styles/landing"
import { BlackPurpleHeading2 } from "../../../components/styles/typography"
import { WhiteRoundedButton } from "../../../components/Button"

const MyBlackPurpleHeading2 = BlackPurpleHeading2.extend`
  text-align: center;
  padding: 1em 1em 0;
  font-size: 28px;
  line-height: 38px;
  @media (min-width: 800px) {
    text-align: left;
    padding: 1em 0 0.3em;
    font-size: 40px;
    line-height: 56px;
  }
`

const MyCenteredColumn = CenteredColumn.extend`
  display: none;

  @media (min-width: 800px) {
    display: flex;
    align-items: flex-start;
  }
`

const Container = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100%;
  margin: 3em 0;

  @media (min-width: 800px) {
    flex-direction: row-reverse;
    justify-content: space-around;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  padding: 0 0 1em;

  @media (min-width: 800px) {
    align-items: flex-start;
    padding: 0;
  }
`

const PhoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Phone = styled.img`
  width: 320px;
  height: 379px;

  @media (min-width: 800px) {
    width: 440px;
    height: 521px;
  }
`

const PreferredBreak = styled.br`
  display: none;

  @media (max-width: 320px) {
    display: inline;
  }
`

const PreferredBreakOnLarge = styled.br`
  display: none;
  @media (min-width: 800px) {
    display: inline;
  }
`

export default class AssetTrackerDemo extends React.Component {
  state = {
    expanded: false
  }

  maybeExpanded() {
    return (
      <div>
        <MyCenteredColumn>
          <WhiteRoundedButton
            onClick={() => this.setState({ expanded: !this.state.expanded })}
            style={{minWidth: "240px", color: this.state.expanded ? "white" : "#651EFF" , backgroundColor: this.state.expanded ? "#651EFF" : "white" }}
          >
            { this.state.expanded ? "Mindre om prylbanken" : "Mer om prylbanken" }
          </WhiteRoundedButton>
        </MyCenteredColumn>
        { this.state.expanded ? (
          <AbsoluteFadeInParagraph>
            Med prylbanken blir det enkelt att hålla ordning på sakerna du bryr dig om.
            Kvitton och viktiga papper är säkrare hos Hedvig än i en låda under sängen,
            och du ser hur försäkringen gäller för varenda pryl.
            Om olyckan är framme anmäler du skadan med ett knapptryck.
          </AbsoluteFadeInParagraph>
        ) : null }
      </div>
    )
  }

  render() {
    return (
      <Container>
        <TextContainer>
          <MyBlackPurpleHeading2>Låt Hedvig hålla koll på dina saker,<PreferredBreakOnLarge /> se exakt hur de är försäkrade</MyBlackPurpleHeading2>
          <HeadingSubText>
            Drulle ingår för alla<PreferredBreak/> prylar värda under 50 000 kr
          </HeadingSubText>
          {this.maybeExpanded()}
        </TextContainer>
        <PhoneContainer>
          <Phone
            src="/assets/web/Images/Hedvig_Prylbanken.png"
            alt="Hedvigs prylbank"
          />
        </PhoneContainer>
      </Container>
    )
  }
}
