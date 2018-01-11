import { takeEvery, put, select } from "redux-saga/effects"
import { APP_STATE_CHANGE } from "../actions/appState"
import { chatActions, types } from "hedvig-redux"

const appStateChange = function*() {
  let state = yield select()

  // {inactive, background} => active
  if (
    state.appState.lastState.match(/inactive|background/) &&
    state.appState.currentState === "active"
  ) {

    // Get messages
    yield put(chatActions.getMessages())
    // If currently collecting bankid, resume
    if (state.bankid.currentlyCollecting) {
      yield put({
        type: types.BANKID_COLLECT,
        payload: { referenceId: state.bankid.referenceId }
      })
    }
  }
}

const appStateSaga = function*() {
  yield takeEvery(APP_STATE_CHANGE, appStateChange)
}

export { appStateSaga }
