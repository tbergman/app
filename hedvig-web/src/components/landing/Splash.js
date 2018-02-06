import React from "react"
import styled from "styled-components"
import Lottie from "react-lottie"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import VisibilitySensor from "react-visibility-sensor"

import { TurquoiseRoundedButtonStyled } from "../styles/button"
import { HeadingSubText } from "../styles/landing";

const Container = styled.div`
  margin: 96px 0 0;
  width: 100%;

  @media (min-width: 800px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 3em 0 0;
    flex-direction: row;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  flex-shrink: 0;

  @media (min-width: 800px) {
    padding: 0 0 0 8em;
    align-items: left;
  }
`

const Heading = styled.h1`
  font-family: "Merriweather";
  font-weight: 400;
  font-size: 36px;
  line-height: normal;
  margin: 0;
  padding: 0 0 0.2em;
  flex-shrink: 0;

  @media (min-width: 800px) {
    font-size: 60px;
    text-align: left;
    white-space: nowrap;
  }
`

const CustomHeadingSubText = HeadingSubText.extend`
  padding: 0 0 0.8em;
  white-space: nowrap;
  flex-shrink: 0;
`

const width = window.innerWidth

const animation = width < 800 ? (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData: require("../../bundledAssets/animations/hedvig_top-statement_animation_mobile_01.json")
    }}
  />
) : (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData: require("../../bundledAssets/animations/hedvig_top-statement_animation_desktop_02.json")
    }}
  />
)

const AnimationContainer = styled.div`
  padding: 1em 1em 7em 1em;
`


class Splash extends React.Component {
  _change = isVisible => {
    this.props.ctaVisibilityChanged(isVisible)
  }

  render() {
    return (
      <Container>
        <TextContainer>
          <Heading>Livet är enklare<br /> med Hedvig</Heading>
          <CustomHeadingSubText>Försäkring som du aldrig upplevt det tidigare</CustomHeadingSubText>
          <div style={{flexShrink: 0}}>
            <Link to="/chat" onClick={this.props.registerCtaClick}>
              <VisibilitySensor onChange={this._change}>
                <TurquoiseRoundedButtonStyled>
                  Sätt upp mig på väntelistan
                </TurquoiseRoundedButtonStyled>
              </VisibilitySensor>
            </Link>
          </div>
        </TextContainer>
        <AnimationContainer>
          {animation}
        </AnimationContainer>
      </Container>
    )
  }
}

export default connect(
  undefined,
  dispatch => ({
    ctaVisibilityChanged: isVisible => dispatch({type: "LANDING/CTA_VISIBILITY_CHANGED", payload: {status: isVisible}}),
    registerCtaClick: () => dispatch({type: "ANALYTICS/CTA_CLICK", payload: {location: "splash"}})
  })
)(Splash)
