import React from "react"
import styled from "styled-components"
import { SubItemContainer, SubItem, SubItemText } from "../styles/landing"

const Container = styled.div`
  display: flex;
  padding: 50px 0;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (min-width: 800px) {
    height: 600px;
  }
`

const CustomSubItem = SubItem.extend`
  max-width: 400px;
`

const Collaboration = () => {
  return (
    <Container>
      <SubItemContainer>
        <CustomSubItem>
          <img
            width={166}
            height={166}
            src="assets/web/Images/handshake.png"
            alt="Samarbete"
          />
            <SubItemText>Hedvig är tryggat av InterHannover, <br/>del av en av världens största återförsäkringskoncerner</SubItemText>
        </CustomSubItem>
        <CustomSubItem>
          <img
            width={166}
            height={166}
            src="assets/web/Images/AA.png"
            alt="Samarbete"
          />
            <SubItemText>AA-rating från Standard &amp; Poor's</SubItemText>
        </CustomSubItem>

        <CustomSubItem>
          <img
            width={166}
            height={166}
            src="assets/icons/authorized.svg"
            alt="samarbete"
          />
            <SubItemText>Hedvig är auktoriserat av Finansinspektionen</SubItemText>
        </CustomSubItem>
      </SubItemContainer>
    </Container>
  )
}

export default Collaboration
