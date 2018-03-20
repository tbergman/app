import { take, takeEvery, put, select } from "redux-saga/effects"
import { delay } from "redux-saga"
import { baseURL } from "../services/environment"
import { API, API_ERROR, STATUS_MESSAGE } from "../actions/types"

const api = function*(action) {
  let state = yield select()
  if (!state.authentication.token) {
    yield take("RECEIVED_TOKEN")
    state = yield select()
  }
  let token = state.authentication.token

  let data
  let response
  let tries = 0
  while (tries < 5) {
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
        response.status >= 402 &&
        `Server error ${response.status} (${url})`
      // Bad request
      // Unauthenticated
      if (knownHttpError || unknownHttpError) {
        throw new Error(`Network communication exception, status code: ${response.status} for action: ${JSON.stringify(action)}, response was: ${JSON.stringify(response)}`)
      } else if (response.status === 401) {
        yield put({
          type: "API/UNAUTHORIZED"
        })
        return
      } else if (response.status !== 204) {
        data = yield response.json()
      } else {
        data = null
      }
      yield put({ type: action.payload.SUCCESS, payload: data })
      if (action.statusMessage) {
        yield put({type: STATUS_MESSAGE, message: action.statusMessage})
      }
      return
    } catch (e) {
      tries += 1
      if (action.payload.method !== 'GET' || tries > 5) {
        yield put({type: STATUS_MESSAGE, message: "Något gick fel 😞"})
        yield put({
          type: action.payload.ERROR || API_ERROR,
          payload: data || e.toString()
        })
        throw e
      } else {
        console.error("Was forced to retry request, tries: ", tries) // eslint-disable-line no-console
        yield delay(500)
      }
    }
  }
}

const apiSaga = function*() {
  yield takeEvery(API, api)
}

export { apiSaga }
