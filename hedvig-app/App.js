import React from "react"
import { Provider } from "react-redux"

const hedvigRedux = require("hedvig-redux")
import nav from "./src/reducers/nav"
import AppNavigator from "./src/containers/AppNavigator"

export default class App extends React.Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore({ additionalReducers: { nav } })
    window.store = this.store
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppNavigator />
      </Provider>
    )
  }
}
