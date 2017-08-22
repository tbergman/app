import React from "react"
import { Provider } from "react-redux"

const hedvigRedux = require("hedvig-redux")
import Home from "./src/containers/Home"

export default class App extends React.Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore()
    window.store = this.store
  }

  render() {
    return (
      <Provider store={this.store}>
        <Home />
      </Provider>
    )
  }
}
