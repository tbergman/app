import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { HeaderStyled, HeaderIconStyled } from "./styles/header"
import { TurquoiseRoundedButtonStyled } from "./styles/button"
import { ResetIconButton } from "./Button"

export class Header extends React.Component {
  render() {
    return (
      <HeaderStyled>
        <Link to="/">
          <HeaderIconStyled />
        </Link>
        {this.props.headerRight || (
          <Link to="/chat">
            <ResetIconButton />
          </Link>
        )}
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
