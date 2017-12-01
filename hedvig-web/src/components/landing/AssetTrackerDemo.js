import React from "react"
import {
  AssetTrackerDemoStyled,
  AssetTrackerDemoTextContainer,
  AssetTrackerDemoPhoneContainer,
  AssetTrackerDemoPhone,
  CenteredColumn
} from "../styles/landing"
import { BlackPurpleHeading2 } from "../styles/typography"
import { WhiteRoundedButton } from "../Button"

const MyBlackPurpleHeading2 = BlackPurpleHeading2.extend`
  text-align: center;
  @media (min-width: 1024px) {
    text-align: left;
  }
`

const MyCenteredColumn = CenteredColumn.extend`
  @media (min-width: 992px) {
    align-items: flex-start;
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
      <AssetTrackerDemoStyled className="pure-g">
        <AssetTrackerDemoPhoneContainer className="pure-u-lg-1-2 pure-u-sm-1-1 pure-u-1-1">
          <AssetTrackerDemoPhone />
        </AssetTrackerDemoPhoneContainer>
        <AssetTrackerDemoTextContainer className="pure-u-lg-1-2 pure-u-sm-1-1 pure-u-1-1">
          <MyBlackPurpleHeading2>
            Låt Hedvig hålla koll på dina prylar, och se exakt hur de är
            försäkrade.
          </MyBlackPurpleHeading2>
          {this.maybeExpanded()}
        </AssetTrackerDemoTextContainer>
      </AssetTrackerDemoStyled>
    )
  }
}
