import { take, takeEvery, put, select } from "redux-saga/effects"
import { baseURL } from "../services/environment"

const api = function*(action) {
  let state = yield select()
  if (!state.authentication.token) {
    console.log("Waiting for token")
    yield take("RECEIVED_TOKEN")
    state = yield select()
    console.log("Token received, continuing...")
  }
  let token = state.authentication.token

  console.log(
    `${action.payload.method} ${baseURL}${action.payload.url} ${action.payload
      .body}`
  )
  let data
  try {
    let response = yield fetch(baseURL + action.payload.url, {
      method: action.payload.method,
      headers: Object.assign(
        { Authorization: `Bearer ${token}` },
        action.payload.headers
      ),
      body: action.payload.body
    })
    if (response.status !== 204) {
      data = yield response.json()
    } else {
      data = null
    }
    yield put({ type: action.payload.SUCCESS, payload: data })
  } catch (e) {
    yield put({
      type: action.payload.ERROR || "API_ERROR",
      payload: data || e.toString()
    })
  }
}

const apiSaga = function*() {
  yield takeEvery("API", api)
}

export { apiSaga }
