import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FooterIconStyled } from "./styles/footer"

const Container = styled.div`
  background-color: #0f007a;
  padding: 20px;
  color: white;
  a {
    color: white;
  }
  @media (min-width: 1200px) {
    padding: 80px 112px;
  }

  .show-on-mobile {
    display: none;
  }
  @media (max-width: 460px) {
    .show-on-mobile {
      display: block;
    }
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

export default class Footer extends React.Component {
  render() {
    return (
      <Container className="pure-g">
        <div className="pure-u-md-1-4 pure-u-sm-1-1 pure-u-1-1">
          <FooterIconStyled />
        </div>
        <div className="pure-u-md-1-4 pure-u-sm-1-1 pure-u-1-1">
          <Link to="/about-us" className="show-on-mobile">
            <div>Om Hedvig</div>
          </Link>
          {/* <Link to="/jobs">
            <div>Karriär</div>
          </Link> */}
          <Link to="/contact">
            <div>Kontakt</div>
          </Link>
          {/*<Link to="/press">
            <div>Press</div>
            </Link>*/}
          <Link to="/FAQ" className="show-on-mobile">
            <div>FAQ</div>
          </Link>
          <Link to="/legal">
            <div>Villkor</div>
          </Link>
        </div>
        <div className="pure-u-md-1-4 pure-u-sm-1-1 pure-u-1-1">&nbsp;</div>
        <div className="pure-u-md-1-4 pure-u-sm-1-1 pure-u-1-1">
          <SocialContainer>
            <div>
              <img alt="fb" src="/assets/web/Social icons/Facebook.svg" />
            </div>
            <div>
              <img
                alt="instagram"
                src="/assets/web/Social icons/Instagram.svg"
              />
            </div>
            <div>
              <img alt="twitter" src="/assets/web/Social icons/Twitter.svg" />
            </div>
          </SocialContainer>
          <SocialContainer style={{ marginBottom: 12, marginTop: 6 }}>
            <a href="https://itunes.apple.com/se/app/hedvig/id123123">
              <img
                src="/assets/web/appstores/appstore-button.svg"
                style={{ width: 152 }}
                alt="Ladda ner på App Store"
              />
            </a>
          </SocialContainer>
          <SocialContainer
            style={{
              marginBottom: 12
            }}
          >
            <a href="https://play.google.com/store/apps/details?id=com.hedvig.app">
              <img
                src="/assets/web/appstores/google-play-button.svg"
                style={{ width: 152 }}
                alt="Ladda ner på Google Play"
              />
            </a>
          </SocialContainer>
        </div>
      </Container>
    )
  }
}
