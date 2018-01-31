import React from "react"
import styled from "styled-components"
import {
  CenteredColumn,
  HeadingSubText,
  AbsoluteFadeInParagraph
} from "../styles/landing"
import { BlackPurpleHeading2 } from "../styles/typography"
import { WhiteRoundedButton } from "../Button"

const MyBlackPurpleHeading2 = BlackPurpleHeading2.extend`
  text-align: center;
  padding: 1em 0 0;
  @media (min-width: 1024px) {
    text-align: left;
  }
`

const MyCenteredColumn = CenteredColumn.extend`
  @media (min-width: 992px) {
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
    flex-direction: row;
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
            style={{minWidth: "240px"}}
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
        <PhoneContainer>
          <Phone
            src="/assets/web/Images/Hedvig_Prylbanken_01@3x.png"
            alt="Hedvigs prylbank"
          />
        </PhoneContainer>
        <TextContainer>
          <MyBlackPurpleHeading2>Låt Hedvig hålla koll på dina saker, se exakt hur de är försäkrade</MyBlackPurpleHeading2>
          <HeadingSubText>
            Drulle ingår för alla prylar värda under 50 000 kr
          </HeadingSubText>
          {this.maybeExpanded()}
        </TextContainer>
      </Container>
    )
  }
}
