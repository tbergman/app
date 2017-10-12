/* global module process require */
import StorybookUI from "./storybook"

import React from "react"
import { Provider } from "react-redux"

const hedvigRedux = require("hedvig-redux")
window.hedvigRedux = hedvigRedux
import nav from "./src/reducers/nav"
import { ConnectedReduxBaseNavigator } from "./src/containers/navigation/navigation"
import * as Navigation from "./src/services/Navigation"
import { apiAndNavigateToChatSaga } from "./src/sagas/apiAndNavigate"
window.Navigation = Navigation

class App extends React.Component {
  constructor() {
    super()
    this.store = hedvigRedux.configureStore({
      additionalReducers: { nav },
      additionalSagas: [apiAndNavigateToChatSaga()] // NOTE: Don't forget to call these sagas to start them!
    })
    window.store = this.store
  }

  componentDidMount() {
    this.store.dispatch({
      type: hedvigRedux.types.AUTHENTICATE,
      payload: { ssn: Math.floor(Math.random() * 100000).toString() }
    })
    this.store.dispatch(hedvigRedux.chatActions.getMessages())
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
