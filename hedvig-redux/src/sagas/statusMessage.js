import {
  STATUS_MESSAGE
} from "../actions/types"
import * as statusMessageActions from "../actions/statusMessage"
import { delay } from 'redux-saga'
import { take, takeEvery, put, select } from "redux-saga/effects"


const delayHideStatusMessage = function*({ payload: { message, warning, error } }) {
  if (message || warning || error) {
    yield delay(3000)
    yield put(statusMessageActions.setStatusMessage({}))
  }
}

const handleStatusMessage = function*() {
  yield takeEvery(STATUS_MESSAGE, delayHideStatusMessage)
}

export { handleStatusMessage }
