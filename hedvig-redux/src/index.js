import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers/index"
import apiMiddleware from "./middleware/api"
import loggingMiddleware from "./middleware/logging"
import helloActions from "./actions/hello"
import insuranceActions from "./actions/insurance"

function configureStore(
  { initialState, additionalReducers, additionalMiddleware = [] } = {}
) {
  let store = createStore(
    rootReducer(additionalReducers),
    initialState,
    compose(
      applyMiddleware(loggingMiddleware, apiMiddleware, ...additionalMiddleware)
    )
  )
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

export { helloActions, configureStore, insuranceActions }
