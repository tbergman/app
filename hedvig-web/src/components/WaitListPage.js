import React from "react"
import styled from "styled-components"

import { Header } from "./Header";

const Container = styled.div`
  height: 100%;
`

const ContentContainer = styled.div`
  display: flex;
  height: calc(100vh - 10%);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 4em 0 0;
`

const ContentSection = styled.div`
  margin: 2em;
  text-align: center;
`

const Footer = styled.div`
  text-align: center;
`

const GreenSeparatorLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.turquoise};
  width: 100vw;
`

const NumberIndicatorHeader = styled.h1`
  font-family: "Merriweather";
  color: ${props => props.theme.colors.purple};
`

class WaitListPage extends React.Component {

  componentDidMount() {
    console.log(this.props.match.params.id)
  }
  
  render() {
    return (
      <Container>
        <Header headerRight={<React.Fragment></React.Fragment>} />
          <ContentContainer>
            <ContentSection>
              <p>Före dig på väntelistan står</p>
              <NumberIndicatorHeader>{ this.props.before || 93 } personer</NumberIndicatorHeader>
            </ContentSection>
            <GreenSeparatorLine />
            <ContentSection>
              <p>Efter dig på väntelistan står</p>
              <NumberIndicatorHeader>{ this.props.before || 12 } personer</NumberIndicatorHeader>
            </ContentSection>
          </ContentContainer>
          <Footer>
            <p>Du får en aktiveringskod på mailen så fort det är din tur!</p>
            Social media stuff - Följ Hedvig på sociala medier så länge
          </Footer>
      </Container>
    )
  }
}

export default WaitListPage
