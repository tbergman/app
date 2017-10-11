const R = require("ramda")
import {
  API,
  SEND_CHAT_RESPONSE,
  LOADING_MESSAGES_START,
  LOADING_MESSAGES_END,
  LOADED_MESSAGES,
  API_AND_NAVIGATE_TO_CHAT,
  SWITCH_BASE
} from "../actions/types"
import * as chatActions from "../actions/chat"
import { take, takeEvery, put, select } from "redux-saga/effects"

const sendChatResponse = function*({ payload: { message, bodyOverride } }) {
  let state = yield select()
  let messageFromState = state.chat.messages.find(
    m => m.globalId === message.globalId
  )
  let body = Object.assign(messageFromState.body, bodyOverride)
  messageFromState.body = body
  yield put({ type: LOADING_MESSAGES_START, payload: {} })
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
  yield take(LOADED_MESSAGES)
  yield put({ type: LOADING_MESSAGES_END, payload: {} })
}

const sendChatResponseSaga = function*() {
  yield takeEvery(SEND_CHAT_RESPONSE, sendChatResponse)
}

const apiAndNavigateToChat = function*({ payload }) {
  if (payload) {
    yield put({
      type: API,
      payload
    })
    let success = yield take(payload.SUCCESS)
    yield put(chatActions.getMessages())
  }
  yield put({
    type: SWITCH_BASE,
    payload: "chat"
  })
}

const apiAndNavigateToChatSaga = function*() {
  yield takeEvery(API_AND_NAVIGATE_TO_CHAT, apiAndNavigateToChat)
}

export { sendChatResponseSaga, apiAndNavigateToChatSaga }
