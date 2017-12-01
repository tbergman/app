import R from "ramda"
import { take, takeEvery, put } from "redux-saga/effects"
import { AUTHENTICATE, RECEIVED_TOKEN, VALIDATE_TOKEN } from "../actions/types"
import { baseURL } from "../services/environment"

const authenticate = function*(action) {
  let requestOpts = {
    method: "POST"
  }
  if (!R.isNil(action.payload) && !R.isEmpty(action.payload)) {
    requestOpts.body = JSON.stringify(action.payload)
    requestOpts.headers = { "Content-Type": "application/json" }
  }
  console.log(`POST ${baseURL}/helloHedvig`, requestOpts)
  let authResponse = yield fetch(`${baseURL}/helloHedvig`, requestOpts)
  if (authResponse.status === 200) {
    let token = yield authResponse.text()
    console.log("Got token", token)
    yield put({ type: RECEIVED_TOKEN, payload: token })
  } else {
    console.warn("Failed to receive token", authResponse)
  }
}

const authenticateSaga = function*() {
  yield takeEvery(AUTHENTICATE, authenticate)
}

const validateToken = function*(action) {
  let token = action.payload
  console.log(`Validating token via GET ${baseURL}/member/me`)
  let validateResponse = yield fetch(`${baseURL}/member/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (validateResponse.status !== 401) {
    console.log("Using stored token:", token)
    yield put({ type: RECEIVED_TOKEN, payload: token })
  } else {
    console.log("Getting a new token:", token)
    yield put({ type: AUTHENTICATE, payload: {} })
  }
}

const validateTokenSaga = function*() {
  yield takeEvery(VALIDATE_TOKEN, validateToken)
}

export { authenticateSaga, validateTokenSaga }
