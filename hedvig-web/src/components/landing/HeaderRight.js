import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { PurpleRoundedButton } from "../Button"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
    margin-right: 20px;
    &:last-child {
      margin-right: 0px;
    }
  }
  @media (max-width: 460px) {
    .text-link {
      display: none;
    }
  }

  .text-link {
    color: ${props => props.theme.colors.purple};
  }
`

const HeaderRight = () => {
  return (
    <Container>
      <Link to="/about-us" className="text-link">
        Om Hedvig
      </Link>
      <Link to="/faq" className="text-link">
        FAQ
      </Link>
      <Link to="/chat">
        <PurpleRoundedButton>Anmäl en skada</PurpleRoundedButton>
      </Link>
    </Container>
  )
}

export default HeaderRight
