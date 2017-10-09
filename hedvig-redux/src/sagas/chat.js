const R = require("ramda")
import { API, SEND_CHAT_RESPONSE } from "../actions/types"
import * as chatActions from "../actions/chat"
import { take, takeEvery, put, select } from "redux-saga/effects"

const sendChatResponse = function*({ payload: { message, bodyOverride } }) {
  let state = yield select()
  let messageFromState = state.chat.messages.find(
    m => m.globalId === message.globalId
  )
  let body = Object.assign(messageFromState.body, bodyOverride)
  messageFromState.body = body
  yield put({
    type: API,
    payload: {
      method: "POST",
      url: messageFromState.header.responsePath,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageFromState, null, 4),
      SUCCESS: "SEND_CHAT_RESPONSE_SUCCESS"
    }
  })
  let success = yield take("SEND_CHAT_RESPONSE_SUCCESS")
  yield put(chatActions.getMessages())
}

const sendChatResponseSaga = function*() {
  yield takeEvery(SEND_CHAT_RESPONSE, sendChatResponse)
}

export { sendChatResponseSaga }
