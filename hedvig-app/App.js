/* global module process require */
import StorybookUI from "./storybook"

import React from "react"
import { AppState, Keyboard, Platform } from "react-native"
import { Provider } from "react-redux"

const hedvigRedux = require("hedvig-redux")
window.hedvigRedux = hedvigRedux
import nav from "./src/reducers/nav"
import { ConnectedReduxBaseNavigator } from "./src/containers/navigation/navigation"
import { MarketingCarouselOrBaseNavigator } from "./src/components/MarketingCarousel"
import * as Navigation from "./src/services/Navigation"
import { apiAndNavigateToChatSaga } from "./src/sagas/apiAndNavigate"
import { tokenStorageSaga } from "./src/sagas/TokenStorage"
import { logoutSaga } from "./src/sagas/logout"
import { ThemeProvider } from "styled-components"
import { theme } from "hedvig-style"
import WithAssets from "./src/components/WithAssets"
window.Navigation = Navigation

import { appStateChange } from "./src/actions/appState"
import { keyboardStateChange } from "./src/actions/keyboardState"
import appStateChangeReducer from "./src/reducers/appState"
import keyboardStateChangeReducer from "./src/reducers/keyboardState"
import { appStateSaga } from "./src/sagas/appState"
import { keyboardSaga } from "./src/sagas/keyboard"
import { navigationSaga } from "./src/sagas/navigation"
import { getOrLoadToken } from "./src/services/TokenStorage"
import EventEmitter from "./src/services/EventEmitter"
import * as baseNavigationActions from "./src/actions/baseNavigation"
window.baseNavigation = baseNavigationActions
window.EventEmitter = EventEmitter()

import {
  ActionSheetProvider,
  connectActionSheet
} from "@expo/react-native-action-sheet"

export class App extends React.Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore({
      additionalReducers: {
        nav,
        appState: appStateChangeReducer,
        keyboard: keyboardStateChangeReducer
      },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        appStateSaga,
        keyboardSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga
      ]
    })
    window.store = this.store
  }

  _handleAppStateChange = nextAppState => {
    this.store.dispatch(appStateChange(nextAppState))
  }

  _keyboardWillShow(event) {
    console.log("Keyboard shown")
    this.store.dispatch(keyboardStateChange({ ...event, state: "shown" }))
  }

  _keyboardWillHide(event) {
    console.log("Keyboard hidden")
    this.store.dispatch(keyboardStateChange({ ...event, state: "hidden" }))
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange)
    this.keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      this._keyboardWillShow.bind(this)
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      this._keyboardWillHide.bind(this)
    )
    getOrLoadToken(this.store.dispatch)

    this.store.dispatch(
      hedvigRedux.listenerActions.addListener(
        hedvigRedux.types.SHOW_ACTION_SHEET,
        ({ payload: { options, callback } }) =>
          this.props.showActionSheetWithOptions(options, callback)
      )
    )

    this.store.dispatch(hedvigRedux.chatActions.getMessages())
    this.store.dispatch(hedvigRedux.chatActions.getAvatars())
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange)
    if (this.keyboardWillShowListener) {
      this.keyboardWillShowListener.remove()
    }
    if (this.keyboardWillHideListener) {
      this.keyboardWillHideListener.remove()
    }
  }

  render() {
    return (
      <WithAssets>
        <ThemeProvider theme={theme}>
          <Provider store={this.store}>
            <MarketingCarouselOrBaseNavigator />
            {/* <ConnectedReduxBaseNavigator /> */}
          </Provider>
        </ThemeProvider>
      </WithAssets>
    )
  }
}

export class AppWithActionSheet extends React.Component {
  constructor() {
    super()
    this.WrappedComponent = connectActionSheet(App)
  }
  render() {
    return (
      <ActionSheetProvider>
        <this.WrappedComponent />
      </ActionSheetProvider>
    )
  }
}

module.exports = process.env.REACT_NATIVE_STORYBOOK_MODE
  ? StorybookUI
  : AppWithActionSheet
