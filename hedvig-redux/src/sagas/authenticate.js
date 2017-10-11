import { take, takeEvery, put } from "redux-saga/effects"
import { AUTHENTICATE } from "../actions/types"
import { baseURL } from "../services/environment"

const authenticate = function*(action) {
  console.log(`POST ${baseURL}/helloHedvig`)
  let authResponse = yield fetch(`${baseURL}/helloHedvig`, {
    method: "POST"
  })
  let token = yield authResponse.text()
  console.log("Got token", token)
  yield put({ type: "RECEIVED_TOKEN", payload: token })
}

const authenticateSaga = function*() {
  yield takeEvery(AUTHENTICATE, authenticate)
}

export { authenticateSaga }
