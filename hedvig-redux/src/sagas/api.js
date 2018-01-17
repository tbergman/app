import { take, takeEvery, put, select } from "redux-saga/effects"
import { baseURL } from "../services/environment"
import { API, API_ERROR } from "../actions/types"
import * as statusMessageActions from "../actions/statusMessage"

const api = function*(action) {
  let state = yield select()
  if (!state.authentication.token) {
    yield take("RECEIVED_TOKEN")
    state = yield select()
  }
  let token = state.authentication.token

  let data
  let response
  try {
    let url = action.payload.url
    response = yield fetch(baseURL + url, {
      method: action.payload.method,
      headers: Object.assign(
        { Authorization: `Bearer ${token}` },
        action.payload.headers
      ),
      body: action.payload.body
    })
    let knownHttpError = {
      400: `Bad request (${url})`,
      401: `Unauthorized (${url})`,
      402: `Payment required (${url})`,
      403: `Forbidden (${url})`,
      404: `Not found (${url})`,
      405: `Method Not Allowed (${url})`,
      500: `Internal server error (${url})`,
      502: `Bad gateway (${url})`,
      503: `Service unavailable (${url})`
    }[response.status.toString()]
    let unknownHttpError =
      !knownHttpError &&
      response.status >= 400 &&
      `Server error ${response.status} (${url})`
    // Bad request
    // Unauthenticated
    if (knownHttpError || unknownHttpError) {
      yield put(
        statusMessageActions.setStatusMessage({
          error: knownHttpError || unknownHttpError
        })
      )
      data = null
    } else if (response.status !== 204) {
      data = yield response.json()
    } else {
      data = null
    }
    yield put({ type: action.payload.SUCCESS, payload: data })
    if (action.statusMessage) {
      yield put(statusMessageActions.setStatusMessage(action.statusMessage))
    }
  } catch (e) {
    yield put(statusMessageActions.setStatusMessage({ error: e.toString() }))
    yield put({
      type: action.payload.ERROR || API_ERROR,
      payload: data || e.toString()
    })
  }
}

const apiSaga = function*() {
  yield takeEvery(API, api)
}

export { apiSaga }
