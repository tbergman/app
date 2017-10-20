const R = require("ramda")
import {
  API,
  SEND_CHAT_RESPONSE,
  LOADING_MESSAGES_START,
  LOADING_MESSAGES_END,
  LOADED_MESSAGES,
  START_POLLING_MESSAGES,
  STOP_POLLING_MESSAGES
} from "../actions/types"
import * as chatActions from "../actions/chat"
import {
  take,
  takeEvery,
  put,
  select,
  takeLatest,
  call
} from "redux-saga/effects"
import { delay } from "redux-saga"

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

const DEFAULT_POLLING_INTERVAL = 1000
const pollMessageHandler = function*(action) {
  if (action.type === START_POLLING_MESSAGES) {
    console.log("Polling for messages")
    let pollingInterval =
      action.payload.pollingInterval || DEFAULT_POLLING_INTERVAL
    yield put(chatActions.getMessages())
    yield call(delay, pollingInterval)
    yield put({
      type: START_POLLING_MESSAGES,
      payload: { pollingInterval }
    })
  } else if (action.type === STOP_POLLING_MESSAGES) {
    console.log("Stopped polling for messages")
  }
}

const pollMessagesSaga = function*() {
  yield takeLatest(
    [START_POLLING_MESSAGES, STOP_POLLING_MESSAGES],
    pollMessageHandler
  )
}

export { sendChatResponseSaga, pollMessagesSaga }
