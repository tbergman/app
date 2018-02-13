import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { TurquoiseRoundedButton } from "../../../components/Button";

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
  font-size: 40px;
  line-height: 56px;
  font-family: "Merriweather";
  font-weight: 400;
  padding: 0 0 0;
`

const PreferredBreak = styled.br`
  @media (min-width: 800px) {
    display: none;
  }
`

const SubText = styled.p`
  padding: 1em 0 0;
  @media (min-width: 800px) {
    font-size: 1.2em;
    line-height: 1.4em;
  }
`


class CallToAction extends React.Component {

  _change = isVisible => {
    this.props.ctaVisibilityChanged(isVisible)
  }

  render() {
    return (
      <Container>
        <Heading>Skaffa Hedvig innan alla andra</Heading>
        {/* <VisibilitySensor onChange={this._change}> */}
        <Link to="/chat" onClick={this.props.registerCtaClick}>
          <TurquoiseRoundedButton style={{minWidth: "120px"}}>
            Sätt upp mig på väntelistan
          </TurquoiseRoundedButton>
          </Link>
        {/* </VisibilitySensor> */}
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
    ctaVisibilityChanged: isVisible => dispatch({type: "LANDING/CTA_VISIBILITY_CHANGED", payload: { status: isVisible}}),
    registerCtaClick: () => dispatch({type: "ANALYTICS/CTA_CLICK", payload: {location: "cta section"}})
  })
)(CallToAction)
