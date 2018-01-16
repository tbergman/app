import styled from "styled-components"

export const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  position: -webkit-sticky;
  width: 100%;
  top: 0;
  z-index: 1;
  height: 72px;
  background-color: white;
  padding: 10;
  border-bottom: solid 1px ${props => props.theme.colors.lightGray};

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

export const HeaderIconStyled = styled.div`
  height: 28px;
  width: 84px;
  background-image: url("/assets/identity/hedvig_wordmark/hedvig_wordmark_black.svg");
  background-size: 84px 28px;
  background-repeat: no-repeat;
`
