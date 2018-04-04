import { AsyncStorage } from 'react-native'
import {
  API,
  EVENT,
  LOADED_MESSAGES,
} from "../actions/types"
import { take, takeEvery, put, call } from "redux-saga/effects"
import * as chatActions from "../actions/chat"

const handleEvent = function*(action) {
  if (action.payload.showLoadingIndicator) {
    // yield put({ type: LOADING_MESSAGES_START, payload: {} })
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
    yield put(chatActions.getMessages())
    if (action.payload.showLoadingIndicator) {
      yield take(LOADED_MESSAGES)
      // yield put({ type: LOADING_MESSAGES_END, payload: {} })
    }
  } else {
    if (action.payload.showLoadingIndicator) {
      // yield put({ type: LOADING_MESSAGES_END, payload: {} })
    }
  }

  yield call(AsyncStorage.removeItem, '@hedvig:isViewingOffer');
}

// Warning: Expected to only be used for the offer modal close event
// Only Offer closeModal sends a type MODAL_CLOSED event
const handleEventSaga = function*() {
  yield takeEvery(EVENT, handleEvent)
}

export { handleEventSaga }
