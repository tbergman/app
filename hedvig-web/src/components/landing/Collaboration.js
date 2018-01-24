import React from "react"
import styled from "styled-components"
import { HeadingContainer, PurpleHeading, SubItemContainer, SubItem, SubItemText } from "../styles/landing"

const Container = styled.div`
  padding-top: 72px;
  padding-bottom: 72px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${"" /* border: solid 1px black; */} @media screen and (max-width: 768px) {
    .first-centered-column {
      margin-bottom: 64px;
    }
  }
`

const CustomSubItem = SubItem.extend`
  max-width: 300px;
`

const Collaboration = () => {
  return (
    <Container>
      <HeadingContainer>
        <PurpleHeading>
          Tryggas av en global försäkringsjätte
        </PurpleHeading>
      </HeadingContainer>
      <SubItemContainer>
        <CustomSubItem>
          <img
            width={100}
            height={100}
            src="assets/web/Images/handshake.png"
            alt="Samarbete"
          />
            <SubItemText>Hedvig är tryggat av InterHannover, <br/>del av en av världens största återförsäkringskoncerner</SubItemText>
        </CustomSubItem>
        <CustomSubItem>
          <img
            width={100}
            height={100}
            src="assets/web/Images/AA.png"
            alt="Samarbete"
          />
            <SubItemText>AA-rating från Standard &amp; Poor's</SubItemText>
        </CustomSubItem>

        <CustomSubItem>
          <img
            width={100}
            height={100}
            src="assets/icons/authorized.svg"
            alt="samarbete"
          />
            <SubItemText>Hedvig auktoriseras av Finansinspektionen</SubItemText>
        </CustomSubItem>
      </SubItemContainer>
    </Container>
  )
}

export default Collaboration
