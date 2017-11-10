import {
  API,
  API_ERROR,
  CHECKOUT,
  LOADING_MESSAGES_START,
  LOADED_MESSAGES,
  LOADING_MESSAGES_END
} from "../actions/types"
import { take, takeEvery, put, select, call } from "redux-saga/effects"
import { delay } from "redux-saga"
import * as chatActions from "../actions/chat"

const handleCheckout = function*(action) {
  // yield put({ type: LOADING_MESSAGES_START, payload: {} })
  yield put({
    type: API,
    payload: {
      method: "POST",
      url: "/hedvig/quoteAccepted",
      body: null,
      SUCCESS: "INITIATE_CHECKOUT"
    }
  })
  yield take("INITIATE_CHECKOUT")

  // HACK: delay 2s before calling GET /messages
  yield call(delay, 2000)

  yield put(chatActions.getMessages())
  yield take(LOADED_MESSAGES)
  // yield put({ type: LOADING_MESSAGES_END, payload: {} })
}

const handleCheckoutSaga = function*() {
  yield takeEvery(CHECKOUT, handleCheckout)
}

export { handleCheckoutSaga }
