import "babel-polyfill"
import React from "react"
import { AppState, Keyboard, Platform } from "react-native"
import { Provider } from "react-redux"
import Sentry from "sentry-expo"
import createRavenMiddleware from "raven-for-redux"
import {
  ActionSheetProvider,
  connectActionSheet
} from "@expo/react-native-action-sheet"
import * as hedvigRedux from "hedvig-redux"
window.hedvigRedux = hedvigRedux

import { theme } from "hedvig-style"
import nav from "./src/reducers/nav"
import * as Navigation from "./src/services/Navigation"
import { apiAndNavigateToChatSaga } from "./src/sagas/apiAndNavigate"
import { tokenStorageSaga } from "./src/sagas/TokenStorage"
import { logoutSaga } from "./src/sagas/logout"
import { ThemeProvider } from "styled-components"
import { Router } from "./src/components/navigation/Router"
import { ErrorBoundary } from "./src/components/ErrorBoundary"
import WithAssets from "./src/components/WithAssets"
window.Navigation = Navigation

import { appStateChange } from "./src/actions/appState"
import { keyboardStateChange } from "./src/actions/keyboardState"
import appStateChangeReducer from "./src/reducers/appState"
import keyboardStateChangeReducer from "./src/reducers/keyboardState"
import statusMessageReducer from "./src/reducers/statusMessage"
import routerReducer from "./src/reducers/router"
import { appStateSaga } from "./src/sagas/appState"
import { keyboardSaga } from "./src/sagas/keyboard"
import { navigationSaga } from "./src/sagas/navigation"
import { chatStartSaga, chatLoginSaga } from "./src/sagas/marketingCarousel"
import { getOrLoadToken } from "./src/services/TokenStorage"
import * as baseNavigationActions from "./src/actions/baseNavigation"
window.baseNavigation = baseNavigationActions

import navigationMiddleware from "./src/middleware/navigation"

Sentry.config("https://11b25670dab44c79bfd36ec805fda14a@sentry.io/271600").install()

const ravenMiddleware = createRavenMiddleware(Sentry, {stateTransformer: state => ({user: state.user})})

export class App extends React.Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore({
      additionalReducers: {
        nav,
        appState: appStateChangeReducer,
        keyboard: keyboardStateChangeReducer,
        status: statusMessageReducer,
        router: routerReducer,
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
        navigationMiddleware,
        ravenMiddleware
      ],
      raven: Sentry
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
      <ErrorBoundary raven={Sentry}>
        <WithAssets>
          <ThemeProvider theme={theme}>
            <Provider store={this.store}>
              <Router />
            </Provider>
          </ThemeProvider>
        </WithAssets>
      </ErrorBoundary>
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

export default AppWithActionSheet
