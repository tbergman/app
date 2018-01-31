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
  height: 62px;
  background-color: white;
  border-bottom: solid 1px ${props => props.theme.colors.lightGray};

  @media (min-width: 800px) {
    justify-content: space-between;
  }

  padding: 0 15px;
`

export const HeaderIconStyled = styled.div`
  margin: auto;
  height: 28px;
  width: 84px;
  background-image: url("/assets/identity/hedvig_wordmark/hedvig_wordmark_black.svg");
  background-size: 84px 28px;
  background-repeat: no-repeat;
  background-position: center;
`
