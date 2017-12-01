import React from "react"
import Lottie from "react-lottie"
import styled from "styled-components"
import { Heading2 } from "../styles/typography"
import {
  PurpleHeading,
  CenteredColumn,
  LandingComponentSection
} from "../styles/landing"
import { WhiteRoundedButton } from "../Button"
var classNames = require("classnames")

const Container = LandingComponentSection.extend`
  text-align: center;
  @media (min-width: 1024px) {
    text-align: left;
  }

  border-top: solid 1px ${props => props.theme.colors.lightGray};
  padding-top: 46px;
  padding-bottom: 46px;
  @media (min-width: 768px) {
    padding-top: 56px;
    padding-bottom: 56px;
  }
  @media (min-width: 992px) {
    padding-top: 142px;
    padding-bottom: 142px;
  }
  @media (min-width: 1200px) {
    padding-top: 160px;
    padding-bottom: 160px;
  }
`

const List = styled.ol`
  margin-top: 48px;
  margin-bottom: 48px;
  list-style-type: none;
  text-align: center;
  padding-left: 0px;
  @media (min-width: 1024px) {
    text-align: left;
  }

  li {
    margin-bottom: 24px;
    &:last-of-type {
      margin-bottom: 0px;
    }
    color: ${props => props.theme.colors.mediumGray};
    &.highlighted {
      color: ${props => props.theme.colors.purple};
    }
  }
`

const MyPurpleHeading = PurpleHeading.extend`
  @media (max-width: 992px) {
    display: block;
    text-align: center;
  }
`

const MyCenteredColumn = CenteredColumn.extend`
  @media (min-width: 1024px) {
    align-items: flex-start;
  }
`

const Left = styled.div`
  @media (max-width: 1024px) {
    margin-bottom: 72px;
  }
`

// const images = [
//   "https://picsum.photos/383/336?image=0",
//   "https://picsum.photos/383/336?image=1",
//   "https://picsum.photos/383/336?image=2"
// ]

const ModelExplanationImage = ({ listHighlightIndex }) => {
  // let src = images[listHighlightIndex]
  return (
    // <div
    //   style={{
    //     height: 336,
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //     backgroundImage: `url(${src})`
    //   }}
    // />
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: require("../../bundledAssets/animations/model_explanation.json")
      }}
      height={400}
      width={375}
    />
  )
}

const HIGHLIGHT_INTERVAL_MS = 4000

export default class ModelExplanation extends React.Component {
  constructor() {
    super()
    this.state = {
      expanded: false,
      listHighlightIndex: 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        listHighlightIndex: (this.state.listHighlightIndex + 1) % 3
      })
    }, HIGHLIGHT_INTERVAL_MS)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  expanded() {
    return (
      <div>
        <p style={{ marginRight: 20, marginBottom: 48 }}>
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
            Mindre om modellen
          </WhiteRoundedButton>
        </MyCenteredColumn>
      </div>
    )
  }

  unexpanded() {
    return (
      <MyCenteredColumn>
        <WhiteRoundedButton onClick={() => this.setState({ expanded: true })}>
          Mer om modellen
        </WhiteRoundedButton>
      </MyCenteredColumn>
    )
  }

  maybeExpanded() {
    return this.state.expanded ? this.expanded() : this.unexpanded()
  }

  render() {
    return (
      <Container className="pure-g">
        <Left className="pure-u-lg-3-5 pure-u-sm-1-1 pure-u-1-1">
          <MyPurpleHeading>
            Det ska också vara schysst <br /> när det är svårt
          </MyPurpleHeading>
          <List>
            <li
              className={classNames({
                highlighted: this.state.listHighlightIndex === 0
              })}
            >
              1. En liten, fast del av dina pengar går till att driva och
              utveckla Hedvig
            </li>
            <li
              className={classNames({
                highlighted: this.state.listHighlightIndex === 1
              })}
            >
              2. Merparten av dina pengar går till en medlemspott för att täcka
              skador
            </li>
            <li
              className={classNames({
                highlighted: this.state.listHighlightIndex === 2
              })}
            >
              3. Finns något kvar i potten när skadorna betalts ges det till
              välgörenhet
            </li>
          </List>
          {this.maybeExpanded()}
        </Left>
        <div className="pure-u-lg-2-5 pure-u-sm-1-1 pure-u-1-1">
          <ModelExplanationImage
            listHighlightIndex={this.state.listHighlightIndex}
          />
        </div>
      </Container>
    )
  }
}
