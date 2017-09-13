import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers/index"
import apiMiddleware from "./middleware/api"
import loggingMiddleware from "./middleware/logging"
import mockMiddleware from "./middleware/mock"
import helloActions from "./actions/hello"
import insuranceActions from "./actions/insurance"
import chatActions from "./actions/chat"

import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas/index"

import mockChatActions from "./actions/mock/chat"

function configureStore(
  { initialState, additionalReducers, additionalMiddleware = [] } = {}
) {
  let sagaMiddleware = createSagaMiddleware()
  let store = createStore(
    rootReducer(additionalReducers),
    initialState,
    compose(
      applyMiddleware(
        loggingMiddleware,
        apiMiddleware,
        mockMiddleware,
        sagaMiddleware,
        ...additionalMiddleware
      )
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}

function main() {
  let store = configureStore()
  store.dispatch(insuranceActions.getDashboard())
  console.log(JSON.stringify(store.getState(), null, 4))
}

if (require.main === module) {
  main()
}

export {
  helloActions,
  configureStore,
  insuranceActions,
  chatActions,
  mockChatActions
}
