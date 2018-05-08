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
  // yield put({ type: LOADING_MESSAGES_START, payload: {} })
  yield put({
    type: API,
    payload: {
      method: "POST",
      url: "/response",
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(messageFromState, null, 4),
      SUCCESS: "SEND_CHAT_RESPONSE_SUCCESS"
    }
  })
  const res = yield take(["SEND_CHAT_RESPONSE_SUCCESS", "API/UNAUTHORIZED"])
  if (res.type === "API/UNAUTHORIZED") {
    yield put({type: "STATUS_MESSAGE", message: "Oj, något verkar ha gått fel! 😳"})
    yield put({type: "AUTHENTICATE"})
    yield take("RECEIVED_TOKEN")
    return yield put(chatActions.getMessages())
  }
  yield put(chatActions.getMessages())
  yield take(LOADED_MESSAGES)
  // yield put({ type: LOADING_MESSAGES_END, payload: {} })
}

const sendChatResponseSaga = function*() {
  yield takeEvery(SEND_CHAT_RESPONSE, sendChatResponse)
}

const startWebChat = function*() {
  yield put({
    type: API,
    payload: {
      url: "/chat/startweb",
      method: "POST",
      SUCCESS: "CHAT/WEB_START_SUCCESS"
    }
  })
  yield take("CHAT/WEB_START_SUCCESS")
  yield put(chatActions.getMessages())
}

export const startWebChatSaga = function*() {
  yield takeEvery("CHAT/START_WEB_CHAT", startWebChat)
}

const resetConversation = function*() {
  yield put({
    type: API,
    payload: {
      url: "/chat/reset",
      method: "POST",
      SUCCESS: "CHAT_RESET_REQUESTED"
    }
  })
  yield take("CHAT_RESET_REQUESTED")
  const state = yield select()
  const intent = state.conversation.intent;
  yield put(chatActions.getMessages({ intent }))
}

const resetConversationSaga = function*() {
  yield takeEvery(RESET_CONVERSATION, resetConversation)
}

const editLastResponse = function*() {
  yield put({
    type: API,
    payload: {
      url: "/chat/edit",
      method: "POST",
      body: null,
      SUCCESS: "EDITED_LAST_RESPONSE"
    }
  })
  yield take("EDITED_LAST_RESPONSE") // TODO: No hardcoded action types
  yield put(chatActions.getMessages())
}

const editLastResponseSaga = function*() {
  yield takeEvery(EDIT_LAST_RESPONSE, editLastResponse)
}

const DEFAULT_POLLING_INTERVAL = 1000
const pollMessageHandler = function*(action) {
  // Remember the last message
  let state = yield select()
  let [lastMessage] = state.chat.messages.slice(-1)

  if (action.type === START_POLLING_MESSAGES) {
    let pollingInterval =
      action.payload.pollingInterval || DEFAULT_POLLING_INTERVAL
    yield put({ type: LOADING_MESSAGES_START, payload: {} })
    yield call(delay, pollingInterval)

    const intent = state.conversation.intent;
    yield put(chatActions.getMessages({ intent }))
    yield take(LOADED_MESSAGES)

    // Decide whether to loop
    let nextState = yield select()
    let [nextLastMessage] = nextState.chat.messages.slice(-1)
    // If we haven't received a new message in GET /messages, loop
    if (nextLastMessage.globalId === lastMessage.globalId) {
      yield put({
        type: START_POLLING_MESSAGES,
        payload: { pollingInterval }
      })
    }
    // Else, we received a new message, don't loop here because the
    // ParagraphInput componentDidMount / componentDidUpdate will have
    // triggered a new START_POLLING_MESSAGES
  } else if (action.type === STOP_POLLING_MESSAGES) {
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
  yield all(
    action.payload.map(avatar => {
      return fork(function*() {
        let response = yield fetch(avatar.URL)
        let json = yield response.json()
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

const getInsuranceWithMessages = function*() {
  yield put(insuranceActions.getInsurance())
}

const getInsuranceWithMessagesSaga = function*() {
  yield takeEvery(API, function*(apiAction) {
    if (apiAction.payload && apiAction.payload.url.includes(chatActions.GET_MESSAGES_URL)) {
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
