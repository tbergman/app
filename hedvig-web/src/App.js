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
import { logoutSaga } from "./sagas/logout"
import scrollPositionReducer from "./reducers/scrollPosition"
import { scrollY } from "./actions/scroll"
import perilReducer from "./reducers/peril"

window.hedvigRedux = hedvigRedux
window.Navigation = Navigation
window.moment = moment

class App extends Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore({
      additionalReducers: {
        router: routerReducer,
        scroll: scrollPositionReducer,
        peril: perilReducer
      },
      // TODO IMPORTANT: Remove the mock middleware!!
      additionalMiddleware: [routerMiddleware /*, mockMiddleware*/],
      additionalSagas: [tokenStorageSaga, logoutSaga]
    })
    window.store = this.store
    getOrLoadToken(this.store.dispatch)
  }

  componentWillMount() {
    // this.store.dispatch(hedvigRedux.chatActions.getMessages())
    this.store.dispatch(hedvigRedux.chatActions.getAvatars())
    window.addEventListener("scroll", evt => {
      // console.log("Scroll position", window.scrollY)
      this.store.dispatch(scrollY(window.scrollY))
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={this.store}>
          <Navigator />
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App
