import React from "react"
import styled from "styled-components"
import Lottie from "react-lottie"
import {
  CenteredColumn
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
  padding: 2em 0 0;
  
  @media (min-width: 800px) {
    flex-direction: row;
    justify-content:  space-around;
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
    padding
  }
`

export default class ClaimDemo extends React.Component {
  state = {
    expanded: false
  }

  unexpanded() {
    return (
      <MyCenteredColumn>
        <BlackPurpleRoundedButtonWhiteBorder
          onClick={() => this.setState({ expanded: true })}
        >
          Mer om appen
        </BlackPurpleRoundedButtonWhiteBorder>
      </MyCenteredColumn>
    )
  }

  expanded() {
    return (
      <div>
        <p style={{ marginTop: -20, marginRight: 20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <MyCenteredColumn>
          <BlackPurpleRoundedButtonWhiteBorder
            onClick={() => this.setState({ expanded: false })}
          >
            Mindre om appen
          </BlackPurpleRoundedButtonWhiteBorder>
        </MyCenteredColumn>
      </div>
    )
  }

  maybeExpanded() {
    return this.state.expanded ? this.expanded() : this.unexpanded()
  }

  render() {
    return (
      <Container>
        <TextContainer>
          <WhiteHeading2>
            Anmäl skador på sekunder, få ersättning på minuter.
          </WhiteHeading2>
          {this.maybeExpanded()}
        </TextContainer>
        <PhoneContainer>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: require("../../bundledAssets/animations/claim_demo.json")
            }}
            height={715}
            width={352}
          />
        </PhoneContainer>
      </Container>
    )
  }
}
