import React, { Component } from "react"
import { Provider } from "react-redux"

import Navigator from "./components/Navigator"

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
        <Navigator />
      </Provider>
    )
  }
}

export default App
