import { ADD_LISTENER } from "../actions/types"
import { take, takeEvery, put, select, call } from "redux-saga/effects"
import { delay } from "redux-saga"

const addListener = function*(action) {
  while (true) {
    // TODO: listen for REMOVE_LISTENER and do `break`
    let waitedForAction = yield take(action.payload.actionType)
    yield call(action.payload.callback, waitedForAction)
  }
}

const addListenerSaga = function*() {
  yield takeEvery(ADD_LISTENER, addListener)
}

export { addListenerSaga }
