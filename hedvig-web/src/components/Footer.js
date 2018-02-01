import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FooterIconStyled } from "./styles/footer"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0f007a;
  color: white;
  a {
    color: white;
  }

  padding: 1.5em;

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 3em 1.5em;
  }

`

const SocialContainer = styled.div`
  display: flex !important;
  flex-direction: row;
  justify-content: flex-start;
  @media (min-width: 767px) {
    justify-content: flex-end;
  }
  img:first-of-type {
    margin-right: 40px;
  }
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
    min-width: 500px;
    justify-content: space-around;
  }
`

const RouteLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const RightContainer = styled.div`
  padding: 1.5em 0 0;

  @media (min-width: 800px) {
    padding: 0;
  }
`

export default class Footer extends React.Component {
  render() {
    return (
      <Container>
        <LeftContainer>
          <FooterIconStyled />
          <RouteLinkContainer>
            <div>
              <Link to="/contact">
                Kontakt
              </Link>
            </div>
            <div>
              <Link to="/terms">
                Försäkringsvillkor
              </Link>
            </div>
            <div>
              <Link to="/legal">
                Legal information
              </Link>
            </div>
          </RouteLinkContainer>
        </LeftContainer>
        <RightContainer>
          <SocialContainer>
            <div>
              <a href="https://www.instagram.com/hedvigers" target="_blank" rel="noopener noreferrer">
                <img
                  alt="instagram"
                  src="/assets/web/Social icons/Instagram.svg"
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </SocialContainer>
          <SocialContainer>
            <a href="https://itunes.apple.com/se/app/hedvig/id123123">
              <img
                src="/assets/web/appstores/appstore-button.svg"
                style={{ width: 152 }}
                alt="Ladda ner på App Store"
              />
            </a>
          </SocialContainer>
          <SocialContainer>
            <a href="https://play.google.com/store/apps/details?id=com.hedvig.app">
              <img
                src="/assets/web/appstores/google-play-button.svg"
                style={{ width: 152 }}
                alt="Ladda ner på Google Play"
              />
            </a>
          </SocialContainer>
        </RightContainer>
      </Container>
    )
  }
}
