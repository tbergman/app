import React from "react"
import styled from "styled-components"
import {
  CenteredColumn,
  HeadingSubText
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
  padding: 0 0 8em;

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

  unexpanded() {
    return (
      <MyCenteredColumn>
        <WhiteRoundedButton onClick={() => this.setState({ expanded: true })}>
          Mer om prylbanken
        </WhiteRoundedButton>
      </MyCenteredColumn>
    )
  }

  expanded() {
    return (
      <div>
        <p style={{ marginTop: -20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <MyCenteredColumn>
          <WhiteRoundedButton
            onClick={() => this.setState({ expanded: false })}
          >
            Mindre om prylbanken
          </WhiteRoundedButton>
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
          <MyBlackPurpleHeading2>
            Låt Hedvig hålla koll på dina prylar, och se exakt hur de är
            försäkrade.
          </MyBlackPurpleHeading2>
          <HeadingSubText>
            Drulle ingår för alla prylar värda under 50 000 kr
          </HeadingSubText>
          {this.maybeExpanded()}
        </TextContainer>
        <PhoneContainer>
          <Phone
            src="/assets/web/Images/Hedvig_Prylbanken_01@3x.png"
            alt="Hedvigs prylbank"
          />
        </PhoneContainer>
      </Container>
    )
  }
}
