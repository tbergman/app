import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { HeaderStyled, HeaderIconStyled } from "./styles/header"
import { TurquoiseRoundedButtonStyled } from "./styles/button"
import { ResetIconButton } from "./Button"

const HeaderLinkContainer = styled.div`
  display: none;
  justify-content: flex-start;
  flex: 1;

  @media (min-width: 800px) {
    min-width: 300px;
    display: flex;
  }
`

const HeaderNavigationLinksContainer = styled.div`
  display: none;

  > a {
    &:visited {
      color: ${props => props.theme.colors.purple};
    }
  }

  @media (min-width: 800px) {
    display: flex;
    justify-content: space-evenly;
    min-width: 300px;
  }
`

export class Header extends React.Component {
  render() {
    return (
      <HeaderStyled>
        <HeaderLinkContainer>
          <HeaderNavigationLinksContainer>
            <Link to="/about-us">
              Om Hedvig
            </Link>
          </HeaderNavigationLinksContainer>
        </HeaderLinkContainer>
        <div>
            <Link to="/">
              <HeaderIconStyled />
            </Link>
          </div>
        <div style={{flex: 1, textAlign: "right"}}>
          {this.props.headerRight || (<React.Fragment/>)}
        </div>
      </HeaderStyled>
    )
  }
}

const PriceText = styled.div`
  font-size: 20px;
  color: ${props => props.theme.colors.purple};
`

export class HeaderWithScroll extends React.Component {
  render() {
    if (this.props.scrollY === 0) {
      return <Header headerRight={this.props.headerRight} />
    } else {
      return (
        <HeaderStyled>
          <PriceText>{this.props.price} kr/mån</PriceText>
          <TurquoiseRoundedButtonStyled onClick={() => this.props.checkout()}>
            Bli försäkrad
          </TurquoiseRoundedButtonStyled>
          <ResetIconButton onClick={() => this.props.closeModal()} />
        </HeaderStyled>
      )
    }
  }
}
