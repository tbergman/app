import styled, { keyframes } from "styled-components"
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
  background-image: url("/assets/web/splash/backdrop.svg");
  background-size: cover;
  height: 600px;
  padding-top: 3em;
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
  align-items: start;
  text-align: center;
  height: 100%;
  width: 100%;
  line-height: 32px;

  @media (min-width: 800px) {
    padding: 0 0 0 4em;
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

export const PurpleHeading = Heading2.extend`
  color: ${props => props.theme.colors.blackPurple};
`

export const SubItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  max-width: 1100px;

  @media (max-width: 786px) {
    flex-direction: column;
    align-items: center;
  }
`

export const SubItem = styled.div`
  display: flex;
  max-width: 250px;
  text-align: center;
  flex-direction: column;
  align-items: center;
`

export const SubItemText = styled.p`
  padding: 12px 0;
  font-size: 18px;
`

export const HeadingContainer = styled.div`
  text-align: center;
  padding: 0 0 36px;
`

export const HeadingSubText = styled.p`
  text-align: center;
  font-size: 1.2em;
  margin: 0.5em;

  @media (min-width: 800px) {
    text-align: left;
    margin: 0 0 1em;
  }
`

const FadeInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const AbsoluteFadeInParagraph = styled.p`
  position: absolute;
  max-width: 600px;

  @media (max-width: 800px) {
    left: 0;
    background-color: #eeeeee;
    border-radius: 20px;
    border: 1px rgba(0,0,0,0) solid;
    margin: 1em 0.5em;
    padding: 0.2em;
    color: black;
    text-align: center;
  }

  animation: ${FadeInAnimation} 0.15s linear;
`
