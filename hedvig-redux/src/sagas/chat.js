const R = require("ramda")
import { API, SEND_CHAT_RESPONSE } from "../actions/types"
import * as chatActions from "../actions/chat"
import { take, takeEvery, put, select } from "redux-saga/effects"

const sendChatResponse = function*({ payload: { message, bodyOverride } }) {
  if (!R.isEmpty(bodyOverride)) {
    message.body = bodyOverride
  }
  yield put({
    type: API,
    payload: {
      method: "POST",
      url: message.header.responsePath,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message, null, 4),
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
