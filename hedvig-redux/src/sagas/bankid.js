import { call, take, takeLatest, put, select } from "redux-saga/effects"
import { delay } from "redux-saga"
import {
  API,
  BANKID_COLLECT,
  BANKID_COLLECT_RESPONSE,
  BANKID_COLLECT_COMPLETE
} from "../actions/types"
import * as chatActions from "../actions/chat"

const COLLECT_DELAY_MS = 1000

const MAX_TRIES = 60
const isDone = (collectResponseBody, tryCount) => {
  if (
    collectResponseBody.bankIdStatus === "COMPLETE" ||
    tryCount >= MAX_TRIES
  ) {
    return true
  } else {
    return false
  }
}

const collectHandler = function*() {
  let state = yield select()
  if (state.bankid.referenceId) {
    yield put({
      type: API,
      payload: {
        url: `/hedvig/collect?referenceToken=${state.bankid.referenceId}`,
        method: "POST",
        body: null,
        SUCCESS: BANKID_COLLECT_RESPONSE
      }
    })
    yield take(BANKID_COLLECT_RESPONSE)
    state = yield select()
    if (isDone(state.bankid.response, state.bankid.tryCount)) {
      yield put({ type: BANKID_COLLECT_COMPLETE })
      yield put(chatActions.getMessages())
    } else {
      yield call(delay, COLLECT_DELAY_MS)
      yield put({
        type: BANKID_COLLECT,
        payload: { referenceId: state.bankid.referenceId }
      })
    }
  } else {
    // TODO: Report this error to the user and Sentry
    console.warn("No referenceId found in `state.bankid.referenceId`") // eslint-disable-line no-console
  }
}

const collectSaga = function*() {
  yield takeLatest(BANKID_COLLECT, collectHandler)
}

export { collectSaga }
