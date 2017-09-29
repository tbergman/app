/* global module process require */
import StorybookUI from "./storybook"

import React from "react"
import { Provider } from "react-redux"

const hedvigRedux = require("hedvig-redux")
import nav from "./src/reducers/nav"
import { ConnectedReduxBaseNavigator } from "./src/containers/navigation/navigation"
import * as Navigation from "./src/services/Navigation"
window.Navigation = Navigation

class App extends React.Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore({ additionalReducers: { nav } })
    window.store = this.store
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedReduxBaseNavigator />
      </Provider>
    )
  }
}

module.exports = process.env.REACT_NATIVE_STORYBOOK_MODE ? StorybookUI : App
