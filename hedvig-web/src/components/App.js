import React from "react"

const App = ({ state, sayHello }) => {
  return (
    <div>
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
        Hello: {state.hello.name}
      </p>
    </div>
  )
}

export default App
