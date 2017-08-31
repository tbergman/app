import { combineReducers } from "redux"
import helloReducer from "./hello"
import insuranceReducer from "./insurance"
import chatReducer from "./chat"
import mockedChatReducer from "./mock/chat"

const rootReducer = (additionalReducers = {}) =>
  combineReducers(
    Object.assign(
      {
        hello: helloReducer,
        insurance: insuranceReducer,
        chat: chatReducer,
        mockedChat: mockedChatReducer
      },
      additionalReducers
    )
  )

export default rootReducer
