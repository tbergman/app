import React, { Component } from "react"
import { Provider } from "react-redux"
import { routerReducer } from "react-router-redux"
import { Navigator, routerMiddleware } from "./components/Navigator"
import * as Navigation from "./services/Navigation"
import { theme } from "hedvig-style"
import { ThemeProvider } from "styled-components"
import { getOrLoadToken } from "./services/TokenStorage"
import * as hedvigRedux from "hedvig-redux"
import moment from "moment"
import { tokenStorageSaga } from "./sagas/TokenStorage"
import Chat from "./containers/Chat"
window.hedvigRedux = hedvigRedux
window.Navigation = Navigation
window.moment = moment

class App extends Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore({
      additionalReducers: {
        router: routerReducer
      },
      additionalMiddleware: [routerMiddleware],
      additionalSagas: [tokenStorageSaga]
    })
    window.store = this.store
    getOrLoadToken(this.store.dispatch)
  }

  componentWillMount() {
    this.store.dispatch(hedvigRedux.chatActions.getMessages())
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={this.store}>
          <Chat />
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App
