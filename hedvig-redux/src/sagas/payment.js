import { takeEvery, put, take } from "redux-saga/effects"

const startPayment = function*(action) {
  // This block only for development
  /*
  yield put({type: "API", payload: {
    url: "/hedvig/trigger/_/createDDM",
    method: "POST",
    body: JSON.stringify({
      ssn: '201212121212',
      firstName: 'Test',
      lastName: 'Testerson',
      email: 'test@hedvig.com'
    }),
    headers: { 'Content-Type': 'application/json'},
    SUCCESS: "PAYMENT/START_PAYMENT_SUCCESS"
  }})
  const res = yield take(["PAYMENT/START_PAYMENT_SUCCESS", "API_ERROR"])
  */
  yield put({
    type: "API",
    payload: {
      url: `/hedvig/trigger/${action.payload.id}`,
      method: "POST",
      body: null,
      SUCCESS: "PAYMENT/RETRIEVE_IFRAME_URL"
    }
  })
  const res2 = yield take(["PAYMENT/RETRIEVE_IFRAME_URL", "API_ERROR"])
  yield put({type: "PAYMENT/RECEIVED_IFRAME_URL", payload: {url: res2.payload.url}})
}

export const startPaymentSaga = function* (){
  yield takeEvery("PAYMENT/REQUEST_PAYMENT_REGISTRATION", startPayment)
}
