import React from "react"
import Lottie from "react-lottie"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import VisibilitySensor from "react-visibility-sensor"

import { TurquoiseRoundedButtonStyled } from "../../../../components/styles/button"
import "./splash.css"

const width = window.innerWidth

const animation = width < 768 ? (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData: require("../../../../bundledAssets/animations/hedvig_top-statement_animation_mobile_01.json")
    }}
  />
) : (
  <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData: require("../../../../bundledAssets/animations/hedvig_top-statement_animation_desktop_02.json")
    }}
  />
)

class Splash extends React.Component {
  _change = isVisible => {
    this.props.ctaVisibilityChanged(isVisible)
  }

  render() {
    return (
      <section className="pure-g pure-centered Splash">
        <div className="pure-u-1-1 pure-u-lg-7-8 Splash__full-height">
          <div className="pure-g pure-centered Splash__full-height">
            <div className="pure-u-1-1 pure-u-lg-2-5 Splash__full-height">
              <div className="Splash__text Splash__full-height">
                <h1 className="Splash__heading">Livet är enklare<br /> med Hedvig</h1>
                <p>Försäkring som du aldrig upplevt det tidigare</p>
                <Link to="/chat" onClick={this.props.registerCtaClick}>
                  <VisibilitySensor onChange={this._change}>
                    <TurquoiseRoundedButtonStyled>
                      Sätt upp mig på väntelistan
                    </TurquoiseRoundedButtonStyled>
                  </VisibilitySensor>
                </Link>
              </div>
            </div>
            <div className="pure-u-1-1 pure-u-lg-3-5 Splash__full-height">
              {animation}
            </div>
          </div>
        </div>
      </section>
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
