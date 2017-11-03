import {
  API,
  EVENT,
  LOADING_MESSAGES_START,
  LOADED_MESSAGES,
  LOADING_MESSAGES_END
} from "../actions/types"
import { take, takeEvery, put, select, call } from "redux-saga/effects"
import { delay } from "redux-saga"
import * as chatActions from "../actions/chat"

const handleEvent = function*(action) {
  if (action.payload.showLoadingIndicator) {
    yield put({ type: LOADING_MESSAGES_START, payload: {} })
  }
  yield put({
    type: API,
    payload: {
      url: "/event",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.payload.info),
      SUCCESS: "POST_EVENT_SUCCESS"
    }
  })
  yield take("POST_EVENT_SUCCESS")

  if (action.payload.getMessagesAfter) {
    // HACK: delay 2s before calling GET /messages
    yield call(delay, 2000)

    yield put(chatActions.getMessages())
    if (action.payload.showLoadingIndicator) {
      yield take(LOADED_MESSAGES)
      yield put({ type: LOADING_MESSAGES_END, payload: {} })
    }
  } else {
    if (action.payload.showLoadingIndicator) {
      yield put({ type: LOADING_MESSAGES_END, payload: {} })
    }
  }
}

const handleEventSaga = function*() {
  yield takeEvery(EVENT, handleEvent)
}

export { handleEventSaga }
