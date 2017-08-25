const { createStore, applyMiddleware, compose } = require("redux")
const rootReducer = require("./reducers/index")
const apiMiddleware = require("./middleware/api")
const loggingMiddleware = require("./middleware/logging")
const helloActions = require("./actions/hello")

function configureStore({ initialState, additionalReducers } = {}) {
  let store = createStore(
    rootReducer(additionalReducers),
    initialState,
    compose(applyMiddleware(loggingMiddleware, apiMiddleware))
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

module.exports = {
  helloActions,
  configureStore
}
