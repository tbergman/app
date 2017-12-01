import styled from "styled-components"
import { Heading2 } from "./typography"
import Lottie from "react-lottie"

// General

export const CenteredColumn = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const LandingComponentSection = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
  @media (min-width: 576px) {
    padding-left: 18px;
    padding-right: 18px;
  }
  @media (min-width: 768px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media (min-width: 992px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @media (min-width: 1200px) {
    padding-left: 114px;
    padding-right: 114px;
  }
`

// Splash

export const SplashStyled = styled.div`
  display: flex !important;
  position: relative;
  overflow: hidden;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 75px;
  background-image: url("/assets/web/splash/backdrop.svg");
  background-size: cover;
  height: 600px;
  @media (min-width: 576px) {
    padding-bottom: 75px;
  }
  @media (min-width: 768px) {
    padding-bottom: 84px;
  }
  @media (min-width: 992px) {
    padding-bottom: 84px;
  }
  @media (min-width: 1200px) {
    padding-bottom: 84px;
  }

  > * {
    position: absolute;
  }
`

export const AnimationsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  > * {
    margin-left: 380px !important;
    &:first-child {
      margin-left: 0px !important;
    }

    @media (max-width: 768px) {
      &:last-child {
        display: none;
      }
    }
  }
`

export const SplashText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;

  > * {
    margin-top: 0px !important;
    margin-bottom: 32px !important;

    &:last-child {
      margin-bottom: 0px !important;
    }

    @media (min-width: 768px) {
      margin-bottom: 52px;
    }
  }

  padding: 0 15px;
  @media (min-width: 576px) {
    padding: 0 18px;
  }
  @media (min-width: 768px) {
    padding: 0 24px;
  }
  @media (min-width: 992px) {
    padding: 0 32px;
  }
  @media (min-width: 1200px) {
    padding: 0 40px;
  }
`

export const AnimationStyled = styled(Lottie)`
  height: 520px;
  width: 347px;
  @media (min-width: 576px) {
    height: 615px;
    width: 410px;
  }
  @media (min-width: 768px) {
    height: 615px;
    width: 410px;
  }
  @media (min-width: 992px) {
    height: 615px;
    width: 410px;
  }
  @media (min-width: 1200px) {
    height: 615px;
    width: 410px;
  }
`

// Claim demo

export const ClaimDemoStyled = LandingComponentSection.extend`
  background-color: ${props => props.theme.colors.blackPurple};
  color: white;

  padding-top: 64px;
  @media (min-width: 576px) {
    padding-top: 64px;
  }
  @media (min-width: 768px) {
    padding-top: 88px;
  }
  @media (min-width: 992px) {
    padding-top: 92px;
  }
  @media (min-width: 1200px) {
    padding-top: 124px;
  }
`

export const ClaimDemoTextContainer = styled.div`
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  > * {
    &:first-child {
      margin-top: 0px;
    }
    margin-top: 40px;
  }

  @media (max-width: 1023px) {
    align-items: center;
    margin-bottom: 45px;
  }
`

export const ClaimDemoPhoneContainer = styled.div`
  display: flex !important;
  justify-content: flex-start;
  align-items: flex-end;

  @media (max-width: 1023px) {
    justify-content: center;
  }
`

export const ClaimDemoPhone = styled.div`
  width: 417px;
  height: 597px;
  background-image: url("http://unsplash.it/417/597");
`

// Asset tracker demo

export const AssetTrackerDemoStyled = LandingComponentSection.extend`
  background-color: white;
  padding-top: 64px;
  @media (min-width: 576px) {
    padding-top: 64px;
  }
  @media (min-width: 768px) {
    padding-top: 88px;
  }
  @media (min-width: 992px) {
    padding-top: 92px;
  }
  @media (min-width: 1200px) {
    padding-top: 124px;
  }
`

export const AssetTrackerDemoTextContainer = ClaimDemoTextContainer

export const AssetTrackerDemoPhoneContainer = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
`

export const AssetTrackerDemoPhone = styled.div`
  width: 440px;
  height: 521px;
  background-image: url("/assets/Web/Images/Hedvig_Prylbanken_01@3x.png");
  background-repeat: no-repeat;
  background-size: contain;
  margin-bottom: 84px;
  @media (max-width: 576px) {
    margin-bottom: 40px;
  }
`

export const PurpleHeading = Heading2.extend`
  color: ${props => props.theme.colors.blackPurple};
`
