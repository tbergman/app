import { takeEvery, put, take } from "redux-saga/effects"

const startPayment = function*(action) {
  yield put({type: "API", payload: {
    url: "/hedvig/startPayment",
    method: "POST",
    body: {
      id: action.payload || 1
    },
    SUCCESS: "PAYMENT/START_PAYMENT_SUCCESS"
  }})
  const res = yield take(["PAYMENT/START_PAYMENT_SUCCESS", "API_ERROR"])
  yield put({type: "PAYMENT/RECEIVED_IFRAME_URL", payload: {url: res.url}})
}

export const startPaymentSaga = function* (){
  yield takeEvery("PAYMENT/REQUEST_PAYMENT_REGISTRATION", startPayment)
}
