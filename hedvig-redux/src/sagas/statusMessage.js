import {
  STATUS_MESSAGE
} from "../actions/types"
import * as statusMessageActions from "../actions/statusMessage"
import { delay } from 'redux-saga'
import { takeEvery, put } from "redux-saga/effects"


const delayHideStatusMessage = function*({ payload: { message, warning, error } }) {
  if (message || warning || error) {
    let displayTime = 10000
    yield delay(displayTime)
    yield put(statusMessageActions.setStatusMessage({}))
  }
}

const handleStatusMessage = function*() {
  yield takeEvery(STATUS_MESSAGE, delayHideStatusMessage)
}

export { handleStatusMessage }
