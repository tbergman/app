import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers/index"
// import apiMiddleware from "./middleware/api"
import mockMiddleware from "./middleware/mock"
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger"
import helloActions from "./actions/hello"
import * as insuranceActions from "./actions/insurance"
import * as chatActions from "./actions/chat"
import * as assetActions from "./actions/assetTracker"
import * as uploadActions from "./actions/upload"
import * as cashbackActions from "./actions/cashback"
import * as userActions from "./actions/user"
import * as pushNotificationActions from "./actions/pushNotification"
import * as dialogActions from "./actions/dialog"
import * as eventActions from "./actions/events"
import * as listenerActions from "./actions/listener"
import * as types from "./actions/types"
import * as environment from "./services/environment"

import createSagaMiddleware from "redux-saga"
import { rootSaga } from "./sagas/index"

import mockChatActions from "./actions/mock/chat"

function configureStore(
  {
    initialState,
    additionalReducers,
    additionalMiddleware = [],
    additionalSagas
  } = {}
) {
  let sagaMiddleware = createSagaMiddleware()
  let middlewares
  if (process.env.NODE_ENV === "development") {
    middlewares = composeWithDevTools({})(applyMiddleware(
      mockMiddleware,
      sagaMiddleware,
      ...additionalMiddleware,
      logger
    ))
  } else {
    middlewares = compose(
      applyMiddleware(
        mockMiddleware,
        sagaMiddleware,
        ...additionalMiddleware,
      )
    )
  }
  let store = createStore(
    rootReducer(additionalReducers),
    initialState,
    middlewares
  )
  sagaMiddleware.run(rootSaga(additionalSagas))
  return store
}

function main() {
  // store.dispatch(insuranceActions.getDashboard())
}

if (require.main === module) {
  main()
}

export {
  helloActions,
  types,
  configureStore,
  environment,
  insuranceActions,
  chatActions,
  assetActions,
  mockChatActions,
  uploadActions,
  cashbackActions,
  userActions,
  pushNotificationActions,
  dialogActions,
  eventActions,
  listenerActions
}
