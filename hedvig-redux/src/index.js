import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers/index"
import apiMiddleware from "./middleware/api"
import loggingMiddleware from "./middleware/logging"
import helloActions from "./actions/hello"

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
  store.dispatch(helloActions.hello("Pascal"))
  console.log(JSON.stringify(store.getState(), null, 4))
}

if (require.main === module) {
  main()
}

export { helloActions, configureStore }
