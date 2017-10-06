import { combineReducers } from "redux"
import helloReducer from "./hello"
import insuranceReducer from "./insurance"
import chatReducer from "./chat"
import mockedChatReducer from "./mock/chat"
import authenticationReducer from "./authentication"
import assetTrackerReducer from "./assetTracker"

const rootReducer = (additionalReducers = {}) =>
  combineReducers(
    Object.assign(
      {
        hello: helloReducer,
        insurance: insuranceReducer,
        chat: chatReducer,
        mockedChat: mockedChatReducer,
        authentication: authenticationReducer,
        assetTracker: assetTrackerReducer
      },
      additionalReducers
    )
  )

export default rootReducer
