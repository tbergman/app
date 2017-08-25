import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Placeholder } from "./Styles"

const Name = styled.span`font-size: 30px;`

const App = ({ state, sayHello }) => {
  return (
    <Placeholder>
      <label>
        Your name:
        <input
          type="text"
          value={state.hello.name || ""}
          onChange={evt => sayHello(evt.target.value)}
          autoFocus
        />
      </label>
      <p>
        Hello: <Name>{state.hello.name}</Name>
      </p>
      <Link to="/another-screen">Go to another screen</Link>
    </Placeholder>
  )
}

export default App
