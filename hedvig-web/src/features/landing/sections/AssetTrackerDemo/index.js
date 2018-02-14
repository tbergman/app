import React from "react"
import { WhiteRoundedButton } from "../../../../components/Button"

import "./assettrackerdemo.css"

export default class AssetTrackerDemo extends React.Component {
  state = {
    expanded: false
  }

  maybeExpanded() {
    return (
      <div>
        <div className="AssetTrackerDemo__expandable">
          <WhiteRoundedButton
            onClick={() => this.setState({ expanded: !this.state.expanded })}
            style={{minWidth: "240px", color: this.state.expanded ? "white" : "#651EFF" , backgroundColor: this.state.expanded ? "#651EFF" : "white" }}
          >
            { this.state.expanded ? "Mindre om prylbanken" : "Mer om prylbanken" }
          </WhiteRoundedButton>
        </div>
        { this.state.expanded ? (
          <p className="AssetTrackerDemo__fade-in-paragraph">
            Med prylbanken blir det enkelt att hålla ordning på sakerna du bryr dig om.
            Kvitton och viktiga papper är säkrare hos Hedvig än i en låda under sängen,
            och du ser hur försäkringen gäller för varenda pryl.
            Om olyckan är framme anmäler du skadan med ett knapptryck.
          </p>
        ) : null }
      </div>
    )
  }

  render() {
    return (
      <section className="pure-g pure-centered AssetTrackerDemo">
        <div className="pure-u-1-1 pure-u-md-2-3">
          <div className="pure-g AssetTrackerDemo__column-order">
            <div className="pure-u-1-1 pure-u-md-3-5">
              <div className="AssetTrackerDemo__text">
                <h1 className="AssetTrackerDemo__heading">Låt Hedvig hålla koll på dina saker,<br/> se exakt hur de är försäkrade</h1>
                <p>
                  Drulle ingår för alla<br/> prylar värda under 50 000 kr
                </p>
                {this.maybeExpanded()}
              </div>
            </div>
            <div className="pure-u-1-1 pure-u-md-2-5">
              <img
                className="AssetTrackerDemo__phone"
                src="/assets/web/Images/Hedvig_Prylbanken.png"
                alt="Hedvigs prylbank"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
