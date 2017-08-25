import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  flex: 1;
  align-self: stretch;
  background-color: white;
  justify-content: center;
  align-items: center;
`

const AnotherScreen = () => {
  return (
    <StyledDiv>
      <p>Another Screen</p>
    </StyledDiv>
  )
}

export default AnotherScreen
