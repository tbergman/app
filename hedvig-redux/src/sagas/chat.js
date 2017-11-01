const R = require("ramda")
import {
  API,
  SEND_CHAT_RESPONSE,
  LOADING_MESSAGES_START,
  LOADING_MESSAGES_END,
  LOADED_MESSAGES,
  START_POLLING_MESSAGES,
  STOP_POLLING_MESSAGES,
  LOADED_AVATARS,
  LOADED_AVATAR_DATA,
  RESET_CONVERSATION,
  EDIT_LAST_RESPONSE
} from "../actions/types"
import * as chatActions from "../actions/chat"
import * as insuranceActions from "../actions/insurance"
import {
  take,
  takeEvery,
  put,
  select,
  takeLatest,
  call,
  all,
  fork
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

const resetConversation = function*(action) {
  yield put({
    type: API,
    payload: {
      url: "/chat/reset",
      method: "POST",
      SUCCESS: "CHAT_RESET_REQUESTED"
    }
  })
  let success = yield take("CHAT_RESET_REQUESTED")
  yield put(chatActions.getMessages())
}

const resetConversationSaga = function*() {
  yield takeEvery(RESET_CONVERSATION, resetConversation)
}

const editLastResponse = function*(action) {
  yield put({
    type: API,
    payload: {
      url: "/chat/edit",
      method: "POST",
      SUCCESS: "EDITED_LAST_RESPONSE"
    }
  })
  let success = yield take("EDITED_LAST_RESPONSE")
  yield put(chatActions.getMessages())
}

const editLastResponseSaga = function*() {
  // yield takeEvery(EDIT_LAST_RESPONSE, editLastResponse)
}

const DEFAULT_POLLING_INTERVAL = 1000
const pollMessageHandler = function*(action) {
  if (action.type === START_POLLING_MESSAGES) {
    let pollingInterval =
      action.payload.pollingInterval || DEFAULT_POLLING_INTERVAL
    console.log("Polling for messages in ", pollingInterval, "ms")
    yield put({ type: LOADING_MESSAGES_START, payload: {} })
    yield call(delay, pollingInterval)
    yield put(chatActions.getMessages())
    yield put({
      type: START_POLLING_MESSAGES,
      payload: { pollingInterval }
    })
  } else if (action.type === STOP_POLLING_MESSAGES) {
    console.log("Stopped polling for messages")
    yield put({ type: LOADING_MESSAGES_END, payload: {} })
  }
}

const pollMessagesSaga = function*() {
  yield takeLatest(
    [START_POLLING_MESSAGES, STOP_POLLING_MESSAGES],
    pollMessageHandler
  )
}

/*
Using `all`, `map` and `fork` is the equivalent of:
yield fork(...)
yield fork(...)
yield fork(...)
...
See redux-saga docs for `fork`
*/
const downloadAvatarData = function*(action) {
  console.log("Going to download avatar data")
  yield all(
    action.payload.map(avatar => {
      return fork(function*() {
        console.log("Going to download avatar", avatar)
        let response = yield fetch(avatar.URL)
        let json = yield response.json()
        console.log("Downloaded avatar", avatar)
        yield put({
          type: LOADED_AVATAR_DATA,
          payload: {
            name: avatar.name,
            data: json
          }
        })
      })
    })
  )
}

const downloadAvatarSaga = function*() {
  yield takeEvery(LOADED_AVATARS, downloadAvatarData)
}

const getInsuranceWithMessages = function*(action) {
  console.log("Getting insurance together with messages")
  yield put(insuranceActions.getInsurance())
}

const getInsuranceWithMessagesSaga = function*() {
  yield takeEvery(API, function*(apiAction) {
    if (apiAction.payload.url === chatActions.GET_MESSAGES_URL) {
      yield getInsuranceWithMessages(apiAction)
    }
  })
}

export {
  sendChatResponseSaga,
  pollMessagesSaga,
  downloadAvatarSaga,
  resetConversationSaga,
  editLastResponseSaga,
  getInsuranceWithMessagesSaga
}
