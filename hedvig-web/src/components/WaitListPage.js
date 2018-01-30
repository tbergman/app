import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { CopyToClipboard } from "react-copy-to-clipboard"

import { Header } from "./Header";
import { WhiteRoundedButton, TurquoiseRoundedButton } from "./Button";

const Container = styled.div`
  height: 100%;
`

const ContentContainer = styled.div`
  display: flex;
  height: calc(100vh - 20%);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 4em 0 0;
`

const ContentSection = styled.div`
  margin: 2em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Footer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const GreenSeparatorLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.turquoise};
  width: 100vw;
`

const ContentHeader = styled.h1`
  font-family: "Merriweather";
  font-size: 72px;
  font-weight: 400;
  color: ${props => props.theme.colors.blackPurple};
`

const InstagramIcon = styled.img`
  width: 50px;
  height: 50px;
`

const CodeText = styled.p`
  font-size: 24px;
  font-family: "Merriweather";
  color: ${props => props.theme.colors.blackPurple};
`

const STATUSES = {
  IN_QUEUE: "IN_QUEUE",
  GRANTED_ACCESS: "GRANTED_ACCESS",
  UNKNOWN: "UNKNOWN"
}

class WaitListPage extends React.Component {
  static defaultProps = {
    before: 93,
    status: STATUSES.GRANTED_ACCESS,
    code: "APPLE123",
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
  }
  
  render() {
    let content
    switch (this.props.status) {
      case STATUSES.IN_QUEUE:
        content = (
          <React.Fragment>
            <ContentSection>
              <p>Före dig på väntelistan står</p>
              <ContentHeader>{ this.props.before || 93 } personer</ContentHeader>
            </ContentSection>
            <GreenSeparatorLine />
            <ContentSection>
              <p>Du får en aktiveringskod på mailen så fort det är din tur!</p>
            </ContentSection>
          </React.Fragment>
        )
        break
      case STATUSES.GRANTED_ACCESS:
        content = (
          <React.Fragment>
            <ContentSection>
              <p>Väntan är över</p>
              <ContentHeader>Välkommen till Hedvig!</ContentHeader>
            </ContentSection>
            <ContentSection>
              <p>Din aktveringskod är</p>
              <CodeText>{this.props.code}</CodeText>
              <CopyToClipboard text={this.props.code}>
                <WhiteRoundedButton>Kopiera koden</WhiteRoundedButton>
              </CopyToClipboard>
              <p>och gå sedan</p>
              <TurquoiseRoundedButton>
                Till appen
              </TurquoiseRoundedButton>
            </ContentSection>
          </React.Fragment>
        )
        break
      case STATUSES.UNKNOWN:
        content = (
          <div>Sign up for wait list for Hedvig here!</div>
        )
        break
      default:
        content = (
          <div>error</div>
        )
        break
    }
    return (
      <Container>
        <Header headerRight={<React.Fragment></React.Fragment>} />
          <ContentContainer>
            {content}
          </ContentContainer>
          {this.props.status !== STATUSES.GRANTED_ACCESS ? (
            <Footer>
              <Link to="https://www.instagram.com/hedvigers">
                <InstagramIcon src="/assets/web/Social icons/Instagram-purple.svg" alt="instagram"/>
              </Link>
              <p>Följ Hedvig på Instagram så länge</p>
            </Footer>
          ) : null}
      </Container>
    )
  }
}

export default WaitListPage
