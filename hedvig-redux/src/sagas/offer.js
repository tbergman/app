import {
  API,
  CHECKOUT,
  LOADED_MESSAGES,
} from "../actions/types"
import { take, takeEvery, put } from "redux-saga/effects"
import * as chatActions from "../actions/chat"

const handleCheckout = function*() {
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
  yield put(chatActions.getMessages())
  yield take(LOADED_MESSAGES)
  // yield put({ type: LOADING_MESSAGES_END, payload: {} })
}

const handleCheckoutSaga = function*() {
  yield takeEvery(CHECKOUT, handleCheckout)
}

export { handleCheckoutSaga }
