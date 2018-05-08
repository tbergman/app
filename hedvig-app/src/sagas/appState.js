import { takeEvery, put, select } from 'redux-saga/effects';
import { APP_STATE_CHANGE } from '../actions/appState';
import { types } from '../../hedvig-redux';

const appStateChange = function*() {
  let state = yield select();

  // {inactive, background} => active
  if (
    state.appState.lastState.match(/inactive|background/) &&
    state.appState.currentState === 'active'
  ) {
    // If currently collecting bankid, resume
    if (state.deprecatedBankId.currentlyCollecting) {
      yield put({
        type: types.DEPRECATED_BANKID_COLLECT,
        payload: { referenceId: state.deprecatedBankId.referenceId },
      });
    }
  }
};

const appStateSaga = function*() {
  yield takeEvery(APP_STATE_CHANGE, appStateChange);
};

export { appStateSaga };
