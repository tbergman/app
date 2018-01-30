/* global module process */
import StorybookUI from "./storybook"

import React from "react"
import { AppState, Keyboard, Platform } from "react-native"
import { Provider } from "react-redux"
import Sentry from "sentry-expo"

import * as hedvigRedux from "hedvig-redux"
window.hedvigRedux = hedvigRedux
import nav from "./src/reducers/nav"
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
import statusMessageReducer from "./src/reducers/statusMessage"
import { appStateSaga } from "./src/sagas/appState"
import { keyboardSaga } from "./src/sagas/keyboard"
import { navigationSaga } from "./src/sagas/navigation"
import { chatStartSaga, chatLoginSaga } from "./src/sagas/marketingCarousel"
import { getOrLoadToken } from "./src/services/TokenStorage"
import EventEmitter from "./src/services/EventEmitter"
import * as baseNavigationActions from "./src/actions/baseNavigation"
window.baseNavigation = baseNavigationActions
window.EventEmitter = EventEmitter()

import {
  ActionSheetProvider,
  connectActionSheet
} from "@expo/react-native-action-sheet"
import { sentryMiddleware } from "./src/middleware/sentry";

Sentry.enableInExpoDevelopment = true;
Sentry.config("https://11b25670dab44c79bfd36ec805fda14a@sentry.io/271600").install()

export class App extends React.Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore({
      additionalReducers: {
        nav,
        appState: appStateChangeReducer,
        keyboard: keyboardStateChangeReducer,
        status: statusMessageReducer
      },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        appStateSaga,
        keyboardSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga,
        chatStartSaga,
        chatLoginSaga
      ],
      additionalMiddleware: [
        sentryMiddleware,
      ]
    })
    window.store = this.store
  }

  _handleAppStateChange = nextAppState => {
    this.store.dispatch(appStateChange(nextAppState))
  }

  _keyboardWillShow(event) {
    this.store.dispatch(keyboardStateChange({ ...event, state: "shown" }))
  }

  _keyboardWillHide(event) {
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
