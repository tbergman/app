import React, { Component } from "react"
import { Provider } from "react-redux"

import Home from "./containers/Home"

import * as hedvigRedux from "hedvig-redux"
window.hedvigRedux = hedvigRedux

class App extends Component {
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

export default App
