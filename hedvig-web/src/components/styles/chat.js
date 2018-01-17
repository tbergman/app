import styled, { keyframes } from "styled-components"

const slideFromLeft = keyframes`
  from {
    transform: translate(-100px, 0px);
    animation-timing-function: ease;
  }

  to {
    transform: translate(0px, 0px)
  }
`

export const StyledUserMessage = styled.div`
  font-family: "Circular Std Book";
  background-color: ${props => props.theme.colors.purple};
  color: ${props => props.theme.colors.white};
  border-radius: 24px;
  padding: 12px 15px;
  font-size: ${props => props.theme.typography.hedvigMessage.web.fontSize}px;
  display: flex;
  align-items: center;
  word-break: break-word;
`

export const StyledMessage = styled.div`
  font-family: "Merriweather";
  background-color: ${props => props.theme.colors.hedvigMessageBackground};
  color: ${props => props.theme.colors.blackPurple};
  border-radius: 8px;
  padding: 12px 15px;
  font-size: ${props => props.theme.typography.hedvigMessage.web.fontSize}px;
  display: flex;
  align-items: center;
  word-break: break-word;
  animation: 0.5s ${slideFromLeft} 1;
`

export const MessageContainerStyled = styled.div`
  background-size: 16px 22px;
  background-position: bottom 15px left;
  background-repeat: no-repeat;
  padding-left: 34px;
`

export const OptionsContainerStyled = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const WrappedOptionsContainerStyled = OptionsContainerStyled.extend`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;

  > * {
    &:first-child {
      margin-left: 0px;
    }
    margin-left: 10px;
  }
`

export const StyledOptionContainer = styled.div`
  margin-bottom: 8px;
`

export const ChatAreaStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 1200px;
  align-self: center;

  margin-top: 82px;
  padding-top: 20px;
  padding-bottom: 30px;
  @media (min-width: 992px) {
    padding-bottom: 117px;
  }
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

export const MessageAreaStyled = styled.div`
  min-height: 100px;
  flex: 1;
  /* Enable momentum scrolling on iOS */
  -webkit-overflow-scrolling: touch;
`

export const InputAreaStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 20px;
  ${"" /* margin-bottom: 117px; */};
`

export const TextInputStyled = styled.input`
  font-family: "Circular Std Book";
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: 24px;
  outline: none;
  color: ${props => props.theme.colors.black};
  padding: 7px 20px;
  appearance: none;
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`
