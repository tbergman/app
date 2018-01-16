import React from "react"
import Lottie from "react-lottie"
import {
  ClaimDemoStyled,
  ClaimDemoTextContainer,
  ClaimDemoPhoneContainer,
  CenteredColumn
} from "../styles/landing"
import { WhiteHeading2 } from "../styles/typography"
import { BlackPurpleRoundedButtonWhiteBorder } from "../Button"

const MyWhiteHeading2 = WhiteHeading2.extend`
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
      <ClaimDemoStyled className="pure-g">
        <ClaimDemoTextContainer className="pure-u-lg-2-3 pure-u-sm-1-1 pure-u-1-1">
          <MyWhiteHeading2>
            Anmäl skador på sekunder, få ersättning på minuter.
          </MyWhiteHeading2>
          {this.maybeExpanded()}
        </ClaimDemoTextContainer>
        <ClaimDemoPhoneContainer className="pure-u-lg-1-3 pure-u-sm-1-1 pure-u-1-1">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: require("../../bundledAssets/animations/claim_demo.json")
            }}
            height={715}
            width={352}
          />
        </ClaimDemoPhoneContainer>
      </ClaimDemoStyled>
    )
  }
}
