import React from "react"
import styled from "styled-components"
import Lottie from "react-lottie"
import {
  CenteredColumn,
  AbsoluteFadeInParagraph,
} from "../../../components/styles/landing"
import { WhiteHeading2 } from "../../../components/styles/typography"
import { BlackPurpleRoundedButtonWhiteBorder } from "../../../components/Button"

const MyCenteredColumn = CenteredColumn.extend`
  display: none;

  @media (min-width: 800px) {
    display: flex;
    align-items: flex-start;
`

const Container = styled.div`
  background-color: ${props => props.theme.colors.blackPurple};
  color: white;
  height: 100%;
  width: 100%;
  padding: 3em 0 0;
  box-shadow: inset 0px -1.5px 0px 0px white;
  overflow: hidden;

  @media (min-width: 800px) {
    flex-direction: column;
    display: flex;
    flex-direction: row;
    justify-content:  space-around;
    max-height: 800px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 0.5em;
  flex-shrink: 0;

  @media (min-width: 800px) {
    align-items: left;
    text-align: left;
    padding: 0 4em;
  }
`

const PhoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (min-width: 800px) {
    justify-content: flex-start;
  }
`

const OuterContainer = styled.div`
  background-color: white;
`

const WhiteBorder = styled.div`
  position: relative;
  background-color: white;
  margin: -7px 0 0;
  height: 7px;
  width: 100%;
`

const PreferredBreak = styled.br`
  display: none;
  @media (min-width: 414px) and (max-width: 800px) {
    display: inline;
  }
`

const PreferredBreakOnLarge = styled.br`
  display: none;
  @media (min-width: 800px) {
    display: inline;
  }
`

const width = window.innerWidth

export default class ClaimDemo extends React.Component {
  state = {
    expanded: false
  }

  maybeExpanded() {
    return (
      <div style={{ padding: "2em 0 0"}}>
        <MyCenteredColumn>
          <BlackPurpleRoundedButtonWhiteBorder
            onClick={() => this.setState({ expanded: !this.state.expanded })}
            style={{minWidth: "200px", color: this.state.expanded ? "#0F007A" : "white", backgroundColor: this.state.expanded ? "white" : "#0F007A"}}
          >
            { this.state.expanded ? "Mindre om appen" : "Mer om appen" }
          </BlackPurpleRoundedButtonWhiteBorder>
        </MyCenteredColumn>
        { this.state.expanded ? (
          <AbsoluteFadeInParagraph>
            När din dator blir stulen behöver du en ny snabbt. Det förstår Hedvig.
            Det sista du vill är att lägga veckor på att krångla med försäkringsbolaget.
            Med Hedvig pratar du in ett kort röstmeddelande och berättar vad som hänt.
            Behöver vi något mer för att kunna betala ersättning så löser vi det enkelt i chatten.
            Om din lägenhet blir vattenskadad behöver du mer än snabb ersättning.
            Då behöver du hjälp. Tryck på en knapp så ringer vi upp dig på direkten.
          </AbsoluteFadeInParagraph>
        ) : null }
      </div>
    )
  }

  render() {
    return (
      <OuterContainer>
        <Container>
          <TextContainer>
            <WhiteHeading2>Anmäl en skada på<PreferredBreak /> sekunder,<PreferredBreakOnLarge /> få ersättning<PreferredBreak/> på minuter</WhiteHeading2>
            {this.maybeExpanded()}
          </TextContainer>
          <PhoneContainer>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: require("../../../bundledAssets/animations/claims_demo.json")
              }}
              height={width > 414 ? 610 : 450}
              width={width > 414 ? 352 : 260}
            />
          </PhoneContainer>
        </Container>
        <WhiteBorder />
      </OuterContainer>
    )
  }
}
