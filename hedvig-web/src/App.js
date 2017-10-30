import React, { Component } from "react"
import { Provider } from "react-redux"
import { routerReducer } from "react-router-redux"
import { Navigator, routerMiddleware } from "./components/Navigator"
import * as Navigation from "./services/Navigation"
import { getOrLoadToken } from "./services/TokenStorage"
import * as hedvigRedux from "hedvig-redux"
import moment from "moment"
import { tokenStorageSaga } from "./sagas/TokenStorage"
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

  render() {
    return (
      <Provider store={this.store}>
        <Navigator />
      </Provider>
    )
  }
}

export default App
