import { take, takeEvery, put } from "redux-saga/effects"
import { AUTHENTICATE } from "../actions/types"
import { baseURL } from "../services/environment"

const authenticate = function*(action) {
  console.log(`POST ${baseURL}/authenticate?ssn=${action.payload.ssn}`)
  let authResponse = yield fetch(
    `${baseURL}/authenticate?ssn=${action.payload.ssn}`,
    {
      method: "POST"
    }
  )
  let uuid = yield authResponse.text()
  console.log(`GET ${baseURL}/collect?uuid=${uuid}`)
  let collectResponse = yield fetch(`${baseURL}/collect?uuid=${uuid}`)
  let token = yield collectResponse.text()
  console.log("Got token", token)
  yield put({ type: "RECEIVED_TOKEN", payload: token })
}

const authenticateSaga = function*() {
  yield takeEvery(AUTHENTICATE, authenticate)
}

export { authenticateSaga }
