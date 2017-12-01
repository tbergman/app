import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Heading2 } from "../styles/typography"
import { PurpleHeading, CenteredColumn } from "../styles/landing"
import { TurquoiseRoundedButton } from "../Button"

const MyPurpleHeading = PurpleHeading.extend`
  margin-bottom: 40px;
`

const Container = styled.div`
  background-color: ${props => props.theme.colors.hedvigMessageBackground};

  padding: 96px 15px 96px 15px;
  @media (min-width: 576px) {
    padding: 96px 15px 96px 15px;
  }
  @media (min-width: 768px) {
    padding: 116px 15px 116px 15px;
  }
  @media (min-width: 992px) {
    padding: 176px 15px 176px 15px;
  }
  @media (min-width: 1200px) {
    padding: 200px 15px 200px 15px;
  }

  display: flex;
  flex-direction: column;
`

const SayHi = () => {
  return (
    <Container className="pure-g">
      <div className="pure-u-1-1">
        <CenteredColumn>
          <MyPurpleHeading>
            Få ditt skräddarsydda<br /> försäkringsförslag på direkten
          </MyPurpleHeading>
          <Link to="/chat">
            <TurquoiseRoundedButton>
              Säg hej till Hedvig!
            </TurquoiseRoundedButton>
          </Link>
        </CenteredColumn>
      </div>
    </Container>
  )
}

export default SayHi
