import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { TurquoiseRoundedButton } from "../../../../components/Button";

import "./calltoaction.css"


class CallToAction extends React.Component {

  _change = isVisible => {
    this.props.ctaVisibilityChanged(isVisible)
  }

  render() {
    return (
      <section className="pure-g pure-centered CallToAction">
        <div className="pure-u-1-1 pure-u-lg-7-8">
          <h1 className="CallToAction__heading">Skaffa Hedvig innan alla andra</h1>
          <Link to="/chat" onClick={this.props.registerCtaClick}>
            <TurquoiseRoundedButton style={{minWidth: "120px"}}>
              Sätt upp mig på väntelistan
            </TurquoiseRoundedButton>
            </Link>
          <div className="pure-g pure-centered">
            <div className="pure-u-1-1 pure-u-md-1-2 pure-u-lg-1-4">
              <p>
                Har du redan en hemförsäkring?
                Inga problem, vi tar hand om bytet
              </p>
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
    ctaVisibilityChanged: isVisible => dispatch({type: "LANDING/CTA_VISIBILITY_CHANGED", payload: { status: isVisible}}),
    registerCtaClick: () => dispatch({type: "ANALYTICS/CTA_CLICK", payload: {location: "cta section"}})
  })
)(CallToAction)
