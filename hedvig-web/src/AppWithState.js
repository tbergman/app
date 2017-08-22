import React, { Component } from "react"
import { Provider } from "react-redux"

import App from "./containers/App"

import * as hedvigRedux from "hedvig-redux"
window.hedvigRedux = hedvigRedux

class AppWithState extends Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore()
    window.store = this.store
  }

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    )
  }
}

export default AppWithState
