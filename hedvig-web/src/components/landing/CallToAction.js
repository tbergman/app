import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import VisibilitySensor from "react-visibility-sensor"
import { TurquoiseRoundedButton } from "../Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.offWhite};
  text-align: center;
  min-height: 400px;
`

const Heading = styled.h1`
  color: ${props => props.theme.colors.blackPurple};
  font-size: 28px;
  line-height: 38px;
  font-family: "Merriweather";
  font-weight: 400;
  padding: 0 0 0.5em;
`

const PreferredBreak = styled.br`
  @media (min-width: 800px) {
    display: none;
  }
`

const SubText = styled.p`
  padding: 1em 0 0;
`


class CallToAction extends React.Component {

  _change = isVisible => {
    console.log("I was called with: ", isVisible)
    this.props.ctaVisibilityChanged(isVisible)
  }

  render() {
    return (
      <Container>
        <Heading>Skaffa Hedvig<PreferredBreak /> före alla andra</Heading>
        <VisibilitySensor onChange={this._change}>
          <TurquoiseRoundedButton>
            Säg hej till Hedvig!
          </TurquoiseRoundedButton>
        </VisibilitySensor>
        <SubText>
          Har du redan en hemförsäkring? <PreferredBreak />
          Inga problem, vi tar hand om bytet
        </SubText>
      </Container>
    )
  }
}

export default connect(
  undefined,
  dispatch => ({
    ctaVisibilityChanged: isVisible => dispatch({type: "LANDING/CTA_VISIBILITY_CHANGED", payload: { status: isVisible}})
  })
)(CallToAction)
