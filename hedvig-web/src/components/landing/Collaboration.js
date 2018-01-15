import React from "react"
import styled from "styled-components"
import { CenteredColumn } from "../styles/landing"

const ImageDescription = styled.div`
  margin-top: 32px;
`

const Container = styled.div`
  padding-top: 72px;
  padding-bottom: 72px;
  ${"" /* border: solid 1px black; */} @media screen and (max-width: 768px) {
    .first-centered-column {
      margin-bottom: 64px;
    }
  }
`

const Collaboration = () => {
  return (
    <Container>
      <div className="pure-g">
        <CenteredColumn className="first-centered-column pure-u-md-1-2 pure-u-sm-1-1 pure-u-1-1">
          <img
            style={{ height: 166, width: 166 }}
            src="assets/web/Images/handshake.png"
            alt="samarbete"
          />
          <ImageDescription>
            I samarbete med ett av världens <br /> största återförsäkringsbolag
          </ImageDescription>
        </CenteredColumn>

        <CenteredColumn className="pure-u-md-1-2 pure-u-sm-1-1 pure-u-1-1">
          <img
            style={{ height: 166, width: 166 }}
            src="assets/web/Images/AA.png"
            alt="samarbete"
          />
          <ImageDescription>
            Auktoriserat av Finansinspektionen
          </ImageDescription>
        </CenteredColumn>
      </div>
    </Container>
  )
}

export default Collaboration
