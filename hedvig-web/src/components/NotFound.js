import React from "react"
import styled from "styled-components"
// import Lottie from "react-lottie"

const NotFoundPage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 72px;
  font-family: "Merriweather";
  color: ${props => props.theme.colors.purple};
`

const NotFound = () => (
  <NotFoundPage>
    Not found <span role="img" aria-label="sad face"> 😞</span>
  </NotFoundPage>
)

export default NotFound
