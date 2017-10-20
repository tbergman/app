/* global module process require */
import StorybookUI from "./storybook"

import React from "react"
import { AppState } from "react-native"
import { Provider } from "react-redux"

const hedvigRedux = require("hedvig-redux")
window.hedvigRedux = hedvigRedux
import nav from "./src/reducers/nav"
import { ConnectedReduxBaseNavigator } from "./src/containers/navigation/navigation"
import * as Navigation from "./src/services/Navigation"
import { apiAndNavigateToChatSaga } from "./src/sagas/apiAndNavigate"
import { ThemeProvider } from "styled-components"
import { theme } from "hedvig-style"
import WithAssets from "./src/components/WithAssets"
window.Navigation = Navigation

import { appStateChange } from "./src/actions/appState"
import appStateChangeReducer from "./src/reducers/appState"
import { appStateSaga } from "./src/sagas/appState"

class App extends React.Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore({
      additionalReducers: { nav, appState: appStateChangeReducer },
      additionalSagas: [apiAndNavigateToChatSaga, appStateSaga]
    })
    window.store = this.store
  }

  _handleAppStateChange = nextAppState => {
    this.store.dispatch(appStateChange(nextAppState))
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange)
    this.store.dispatch({
      type: hedvigRedux.types.AUTHENTICATE,
      payload: { ssn: Math.floor(Math.random() * 100000).toString() }
    })
    this.store.dispatch(hedvigRedux.chatActions.getMessages())
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange)
  }

  render() {
    return (
      <WithAssets>
        <ThemeProvider theme={theme}>
          <Provider store={this.store}>
            <ConnectedReduxBaseNavigator />
          </Provider>
        </ThemeProvider>
      </WithAssets>
    )
  }
}

module.exports = process.env.REACT_NATIVE_STORYBOOK_MODE ? StorybookUI : App
