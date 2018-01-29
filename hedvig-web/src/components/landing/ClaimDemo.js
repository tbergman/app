import React from "react"
import styled from "styled-components"
import Lottie from "react-lottie"
import {
  CenteredColumn,
  AbsoluteFadeInParagraph,
} from "../styles/landing"
import { WhiteHeading2 } from "../styles/typography"
import { BlackPurpleRoundedButtonWhiteBorder } from "../Button"

const MyCenteredColumn = CenteredColumn.extend`
  @media (min-width: 992px) {
    align-items: flex-start;
  }
`

const Container = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.blackPurple};
  color: white;
  height: 100%;
  width: 100%;
  flex-direction: column;
  padding: 10em 0 0;
  
  @media (min-width: 800px) {
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

  @media (min-width: 800px) {
    align-items: left;
    text-align: left;
    max-width: 700px;
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
      <Container>
        <TextContainer>
          <WhiteHeading2>Anmäl en skada på sekunder, få ersättning på minuter</WhiteHeading2>
          {this.maybeExpanded()}
        </TextContainer>
        <PhoneContainer>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: require("../../bundledAssets/animations/claims_demo.json")
            }}
            height={610}
            width={352}
          />
        </PhoneContainer>
      </Container>
    )
  }
}
